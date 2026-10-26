export function runTests(code, functionName, testCases) {
  const results = [];

  for (const test of testCases) {
    try {
      const getFunction = new Function(`${code}\nreturn ${functionName};`);
      const userFunction = getFunction();
      const actual = userFunction(...test.input);
      const passed = JSON.stringify(actual) === JSON.stringify(test.output);
      results.push({
        input: test.input,
        expected: test.output,
        actual,
        passed,
      });
    } catch (error) {
      results.push({
        input: test.input,
        expected: test.output,
        error: error.message,
        passed: false,
      });
    }
  }

  const testPassed = results.filter((result) => result.passed).length;
  return { results, testPassed, testTotal: testCases.length };
}
