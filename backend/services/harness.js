/**
 * Harness generation for JavaScript code execution.
 *
 * Exports:
 *   jsonToJsLiteral(value)    — JS value -> JS source literal (JSON.stringify)
 *   buildJavaScriptHarness(userCode, methodName, testCases) — full main.js source
 *   parseRunnerOutput(stdout, stderr, exitCode, testCases) — structured result
 *   canonicalizeJson(value)   — recursively sort object keys for stable comparison
 */

const SENTINEL = '===CODEDRILL_RESULT===';

// ---------------------------------------------------------------------------
// Canonical JSON — sort object keys recursively for stable comparison.
// Postgres jsonb reorders object keys, so both sides must use sorted form.
// ---------------------------------------------------------------------------

/**
 * Recursively sort object keys so that JSON.stringify produces a canonical
 * representation.  Non-object values pass through unchanged.
 */
export function canonicalizeJson(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(canonicalizeJson);
  const sorted = {};
  for (const key of Object.keys(value).sort()) {
    sorted[key] = canonicalizeJson(value[key]);
  }
  return sorted;
}

// ---------------------------------------------------------------------------
// jsonToJsLiteral — convert a JS value to its JavaScript source-code literal
// ---------------------------------------------------------------------------

/**
 * Convert a JS value (string, number, boolean, null, array, object)
 * into a JavaScript source-code literal string.
 * Uses JSON.stringify which handles all these types correctly.
 *
 * @param {*} value - The JS value to convert.
 * @returns {string} JavaScript source literal.
 */
export function jsonToJsLiteral(value) {
  return JSON.stringify(value);
}

// ---------------------------------------------------------------------------
// buildJavaScriptHarness
// ---------------------------------------------------------------------------

/**
 * Generate a complete JavaScript source that embeds the user's function,
 * runs all test cases, and prints a JSON result line after a sentinel.
 *
 * The user code is a top-level function definition (function declaration,
 * arrow, or const — pasted verbatim).
 *
 * Output protocol: sentinel line followed by
 * one JSON line {results:[{index, passed, expected, actual}]}.
 * Expected and actual are canonical JSON strings (sorted object keys).
 * undefined return values render as "null".
 *
 * @param {string} userCode - User-supplied JavaScript function.
 * @param {string} methodName - The function to call for each test case.
 * @param {Array<{input: any[], expectedOutput: any}>} testCases
 * @returns {string} Complete JavaScript source.
 */
export function buildJavaScriptHarness(userCode, methodName, testCases) {
  const invocations = testCases
    .map((tc, i) => buildJsTestInvocation(methodName, tc, i))
    .join('\n');

  return `// === USER CODE START ===
${userCode}
// === USER CODE END ===

function __canonicalize(v) {
  if (v === null || v === undefined || typeof v !== "object") return v;
  if (Array.isArray(v)) return v.map(__canonicalize);
  const s = {};
  for (const k of Object.keys(v).sort()) s[k] = __canonicalize(v[k]);
  return s;
}
function __cj(v) {
  if (v === undefined) return "null";
  return JSON.stringify(__canonicalize(v));
}

const __results = [];
${invocations}
console.log("${SENTINEL}");
console.log(JSON.stringify({results:__results}));
`;
}

/**
 * Build the JavaScript source fragment that invokes one test case,
 * wrapped in try/catch so a runtime exception is captured per-test.
 */
function buildJsTestInvocation(methodName, testCase, index) {
  const args = testCase.input.map((v) => jsonToJsLiteral(v)).join(',');
  const expectedCanonical = JSON.stringify(
    canonicalizeJson(testCase.expectedOutput),
  );
  const expectedLiteral = JSON.stringify(expectedCanonical);

  return `try {
  const __actual_${index} = ${methodName}(${args});
  const __actualStr_${index} = __cj(__actual_${index});
  const __expectedStr_${index} = ${expectedLiteral};
  __results.push({index:${index},passed:__actualStr_${index}===__expectedStr_${index},expected:__expectedStr_${index},actual:__actualStr_${index}});
} catch(__e_${index}) {
  __results.push({index:${index},passed:false,expected:${expectedLiteral},actual:"ERROR: "+(__e_${index}.message||String(__e_${index}))});
}`;
}

// ---------------------------------------------------------------------------
// parseRunnerOutput
// ---------------------------------------------------------------------------

/**
 * Parse the stdout/stderr/exitCode from the interpreter into a structured result.
 *
 * Protocol: the harness prints a sentinel line ("===CODEDRILL_RESULT===")
 * followed by a single JSON line containing { results: [...] }.
 * Any user output before the sentinel is ignored (C8).
 *
 * @param {string} stdout - Raw stdout from the interpreter.
 * @param {string} stderr - Raw stderr from the interpreter.
 * @param {number} exitCode - Process exit code.
 * @param {Array<{input: any[], expectedOutput: any}>} testCases
 * @param {number} [userLineCount] Lines in the user's code, used to hide harness lines from syntax errors.
 * @returns {{ status: string, results: Array, passed: number, total: number, errorMessage?: string }}
 */
export function parseRunnerOutput(
  stdout,
  stderr,
  exitCode,
  testCases,
  userLineCount,
) {
  const total = testCases.length;

  // Try to extract JSON from after the sentinel
  const parsed = extractResultAfterSentinel(stdout);

  if (parsed === null) {
    // No valid sentinel+JSON found — classify as error
    const errorMessage = buildErrorMessage(stderr, exitCode, userLineCount);
    return {
      status: 'error',
      results: [],
      passed: 0,
      total,
      errorMessage,
    };
  }

  // We have valid results from the harness
  const results = parsed.results.map((r) => ({
    index: r.index,
    passed: r.passed,
    expected: r.expected,
    actual: r.actual,
    input: testCases[r.index].input,
  }));

  const passed = results.filter((r) => r.passed).length;
  const status = passed === total ? 'solved' : 'failed';

  return { status, results, passed, total };
}

/**
 * Look for the sentinel line in stdout, then parse the JSON line after it.
 * Returns the parsed object or null if not found / not valid JSON.
 */
function extractResultAfterSentinel(stdout) {
  const lines = stdout.split('\n');
  const sentinelIdx = lines.lastIndexOf(SENTINEL);
  if (sentinelIdx === -1 || sentinelIdx >= lines.length - 1) {
    return null;
  }

  const jsonLine = lines[sentinelIdx + 1];
  try {
    const obj = JSON.parse(jsonLine);
    if (obj && Array.isArray(obj.results)) {
      return obj;
    }
    return null;
  } catch {
    return null;
  }
}

/** Lines the harness adds above the user's code, so reported line numbers can be shifted back. */
const HARNESS_LINES_BEFORE_USER_CODE = 1;

const ERROR_LINE = /^([A-Za-z]*Error): (.*)$/;
const STACK_FRAME_LINE = /^\s+at\s/;
const NODE_VERSION_LINE = /^Node\.js v\d/;
const LOCATION_LINE = /^.*:(\d+)$/;
const HARNESS_IDENTIFIER = /__[A-Za-z]|===/;
const UNCLOSED_CODE_MESSAGE =
  'SyntaxError: Unexpected end of your code \u2014 check for an unclosed ( { or [.';

/**
 * Reduce raw interpreter stderr to what the user needs: for a SyntaxError the
 * offending source line, caret and "SyntaxError: message"; otherwise
 * "ErrorName: message". Stack frames, temp paths and the Node version are dropped.
 *
 * When the reported line is past the user's code (an unclosed bracket makes Node
 * report the harness that follows) or shows harness identifiers, the line and
 * caret are dropped in favour of a generic hint.
 *
 * @param {string} stderr
 * @param {number} [userLineCount] Number of lines in the user's code, when known.
 * @returns {string} Sanitized message, or '' when nothing useful is present.
 */
export function sanitizeErrorOutput(stderr, userLineCount = Infinity) {
  const lines = (stderr ?? '').split('\n').map((l) => l.replace(/\r$/, ''));
  const errorIdx = lines.findIndex((l) => ERROR_LINE.test(l));

  if (errorIdx === -1) {
    const fallback = lines.find(
      (l) =>
        l.trim() &&
        !STACK_FRAME_LINE.test(l) &&
        !NODE_VERSION_LINE.test(l) &&
        !LOCATION_LINE.test(l),
    );
    return fallback ? fallback.trim() : '';
  }

  const errorLine = lines[errorIdx];
  if (!errorLine.startsWith('SyntaxError')) return errorLine;

  // Node prints: "<file>:<line>", source line, caret line, blank, error line.
  const block = lines.slice(0, errorIdx);
  const locIdx = block.findIndex((l) => LOCATION_LINE.test(l));
  const source = locIdx === -1 ? undefined : block[locIdx + 1];
  const caret = locIdx === -1 ? undefined : block[locIdx + 2];
  const userLine =
    locIdx === -1
      ? 0
      : Number(block[locIdx].match(LOCATION_LINE)[1]) -
        HARNESS_LINES_BEFORE_USER_CODE;

  if (userLine > userLineCount || HARNESS_IDENTIFIER.test(source ?? '')) {
    return UNCLOSED_CODE_MESSAGE;
  }
  if (
    userLine < 1 ||
    !source ||
    !source.trim() ||
    !caret ||
    !caret.includes('^')
  ) {
    return errorLine;
  }
  return `Line ${userLine}:\n${source}\n${caret}\n${errorLine}`;
}

/** Build a human-readable error message from stderr and exit code. */
function buildErrorMessage(stderr, exitCode, userLineCount) {
  const cleaned = sanitizeErrorOutput(stderr, userLineCount);
  if (cleaned) {
    return cleaned;
  }
  if (exitCode === 137) {
    return 'Process killed (possible timeout or out of memory)';
  }
  if (exitCode !== 0) {
    return `Process exited with code ${exitCode}`;
  }
  return 'No output received from code execution';
}
