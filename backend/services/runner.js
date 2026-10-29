import { execFile } from 'node:child_process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildJavaScriptHarness, parseRunnerOutput } from '#services/harness';

const COMMAND = 'node';
const FILE_NAME = 'main.js';
export const MAX_CODE_SIZE = 10240;
export const RUN_TIMEOUT_MS = 3000;

/** Cap on captured stdout/stderr so a runaway print loop cannot exhaust memory. */
const MAX_OUTPUT_BYTES = 1024 * 1024;

const TIMEOUT_MESSAGE = 'Time limit exceeded. Your code took too long to run.';

/**
 * Execute user code against test cases by spawning the local interpreter.
 *
 * The harness source is written to a temporary directory, run with `node`,
 * and the directory is removed afterwards. This runs the code with the
 * server's own permissions and is intended for local, single-user use.
 *
 * @param {{ code: string, methodName: string, testCases: Array<{input: any[], expectedOutput: any}>, timeoutMs?: number }} params
 * @returns {Promise<{ status: string, results: Array, passed: number, total: number, errorMessage?: string }>}
 */
export async function executeCode({
  code,
  methodName,
  testCases,
  timeoutMs = RUN_TIMEOUT_MS,
}) {
  validateCodeSize(code);

  const harnessContent = buildJavaScriptHarness(code, methodName, testCases);
  const dir = await mkdtemp(join(tmpdir(), 'codedrill-'));

  try {
    const filePath = join(dir, FILE_NAME);
    await writeFile(filePath, harnessContent, 'utf8');
    const { stdout, stderr, exitCode, timedOut } = await runInterpreter(
      filePath,
      timeoutMs,
    );
    if (timedOut) {
      return parseRunnerOutput('', TIMEOUT_MESSAGE, 1, testCases);
    }
    return parseRunnerOutput(
      stdout,
      hidePath(stderr, dir),
      exitCode,
      testCases,
      code.split('\n').length,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

/** Replace the temp directory in interpreter output so users only see the file name. */
function hidePath(text, dir) {
  return text.split(`${dir}/`).join('');
}

function validateCodeSize(code) {
  if (code && code.length <= MAX_CODE_SIZE) return;
  const err = new Error(
    `Code must be between 1 and ${MAX_CODE_SIZE} characters.`,
  );
  err.status = 400;
  throw err;
}

/**
 * Spawn `node filePath` and resolve with its output. Never rejects for a
 * non-zero exit or a timeout; those are reported in the result so the caller
 * can turn them into a user-facing error.
 */
function runInterpreter(filePath, timeoutMs) {
  return new Promise((resolve, reject) => {
    execFile(
      COMMAND,
      [filePath],
      {
        timeout: timeoutMs,
        maxBuffer: MAX_OUTPUT_BYTES,
        killSignal: 'SIGKILL',
      },
      (error, stdout, stderr) => {
        if (!error) {
          return resolve({ stdout, stderr, exitCode: 0, timedOut: false });
        }
        if (error.code === 'ENOENT') {
          const err = new Error(
            `Code runner unavailable: '${COMMAND}' not found`,
          );
          err.status = 503;
          return reject(err);
        }
        const timedOut = error.killed || error.signal === 'SIGKILL';
        resolve({
          stdout: stdout ?? '',
          stderr: stderr ?? '',
          exitCode: typeof error.code === 'number' ? error.code : 1,
          timedOut,
        });
      },
    );
  });
}
