// Results panel under the editor: summary line + one row per test
export default function TestResults({ result, error, methodName }) {
  if (error) {
    return <div className='results-summary some-fail'>{error}</div>;
  }

  if (!result) {
    return (
      <div className='results-empty'>
        Run your code to see how it does against the tests.
      </div>
    );
  }

  // Code didn't run at all (syntax error, timeout...)
  if (result.status === 'error') {
    return (
      <>
        <div className='results-summary some-fail'>Your code has an error</div>
        <pre className='results-error'>{result.errorMessage}</pre>
      </>
    );
  }

  const allPassed = result.testsPassed === result.testsTotal;

  return (
    <>
      {allPassed ? (
        <div className='results-summary all-pass'>
          🎉 All {result.testsTotal} tests passed!
        </div>
      ) : (
        <div className='results-summary some-fail'>
          {result.testsPassed} / {result.testsTotal} tests passed — keep going.
        </div>
      )}
      <div className='table-wrap'>
        <table className='table'>
          <thead>
            <tr>
              <th>Call</th>
              <th>Expected</th>
              <th>Run</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {result.results.map((test) => (
              <tr key={test.index}>
                {/* Hidden tests come back without input/expected/actual */}
                {test.input ? (
                  <>
                    <td className='mono'>
                      {methodName}({test.input.map((value) => JSON.stringify(value)).join(', ')})
                    </td>
                    <td className='mono'>{test.expected}</td>
                    <td className='mono'>{test.actual}</td>
                  </>
                ) : (
                  <td className='subtle' colSpan={3}>
                    Hidden test
                  </td>
                )}
                <td>
                  <span className={`status ${test.passed ? 'ok' : 'fail'}`}>
                    {test.passed ? '✓ OK' : '✕ X'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
