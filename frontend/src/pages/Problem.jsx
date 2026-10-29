import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import TestResults from '../components/TestResults';
import React from 'react';
import { useCallback } from 'react';

export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [runError, setRunError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/problems/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProblem(data);
        setCode(data.starter_code);
      });
  }, [id]);

  const execute = useCallback(async () => {
    setIsRunning(true);
    setRunError('');
    try {
      const response = await fetch(`http://localhost:3000/problems/${id}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (!response.ok) {
        setResult(null);
        setRunError(data.error ?? 'Something went wrong. Try again.');
        return;
      }
      setResult(data);
    } catch {
      setResult(null);
      setRunError('Could not reach the server. Is the backend running?');
    } finally {
      setIsRunning(false);
    }
  }, [id, code]);

  const updateCode = React.useCallback((val) => {
    // console.log('val:', val);
    setCode(val);
  }, []);
  if (!problem) return <p>Loading...</p>;

  return (
    <main className='problem-shell'>
      <section className='problem-pane'>
        <div
          className='tabs'
          data-tabs='left'
          style={{
            padding: '0 20px',
            background: 'var(--surface)',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <button className='active' data-tab='desc'>
            Description
          </button>
          {/* <button data-tab="subs">My submissions</button>
          <button data-tab="sol">Solution</button> */}
        </div>
        <div className='problem-pane-inner'>
          <div className='tab-panel active' id='desc' data-group='left'>
            <div className='breadcrumb'>
              <Link to='/categories'>Problems</Link>
              <span>/</span>
              <Link to={`/categories/${problem.category_id}`}>
                Back to category
              </Link>
            </div>
            <div className='problem-title-row'>
              <h1>{problem?.name}</h1>
              <span className={`badge ${problem?.difficulty}`}>
                <span className='dot' />
                {problem?.difficulty}
              </span>
              {/* <span className="badge">+{problem?.xp} XP</span> */}
            </div>
            <div className='problem-desc'>
              <p>{problem?.description}</p>
            </div>
            <div className='examples'>
              <h4>Examples</h4>

              {problem.testCases.map((test) => (
                <div className='example' key={test.id}>
                  Input: {JSON.stringify(test.input)} {'->'} Expected:{' '}
                  {JSON.stringify(test.output)}{' '}
                </div>
              ))}
            </div>
          </div>
          <div className='tab-panel' id='subs' data-group='left'>
            <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>
              Your attempts
            </h3>
            <div className='card'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Result</th>
                    <th>Tests</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2 min ago</td>
                    <td>
                      <span className='status fail'>✕ Failed</span>
                    </td>
                    <td className='mono'>4/7</td>
                  </tr>
                  <tr>
                    <td>5 min ago</td>
                    <td>
                      <span className='status fail'>✕ Error</span>
                    </td>
                    <td className='mono'>0/7</td>
                  </tr>
                  <tr>
                    <td>Yesterday</td>
                    <td>
                      <span className='status partial'>◐ Partial</span>
                    </td>
                    <td className='mono'>5/7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='tab-panel' id='sol' data-group='left'>
            <div
              className='card card-pad'
              style={{ textAlign: 'center', padding: '40px 24px' }}
            >
              <div style={{ fontSize: '32px' }}>🔒</div>
              <h3 style={{ margin: '10px 0 6px' }}>Solution locked</h3>
              <p className='muted' style={{ fontSize: '14px' }}>
                Solve the problem or make 3 attempts to unlock the reference
                solution.
              </p>
              <button className='btn' style={{ marginTop: '16px' }}>
                Reveal anyway (no XP)
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className='work-pane'>
        <div className='editor-toolbar'>
          <button
            className='btn btn-sm btn-ghost'
            title='Reset to starter code'
            onClick={() => setCode(problem.starter_code)}
          >
            ↺ Reset
          </button>
          <div className='spacer' />
          <button className='btn btn-sm' onClick={execute} disabled={isRunning}>
            {isRunning ? 'Running…' : '▶ Run'}
          </button>
          <button className='btn btn-sm btn-success' id='submitBtn'>
            Submit
          </button>
        </div>
        <div className='editor'>
          <CodeEditor value={code} onChange={updateCode} />
        </div>
        <div className='results'>
          <div className='results-head'>
            <h3>Test results</h3>
            <div className='spacer' />
          </div>
          <div className='results-body'>
            <TestResults
              result={result}
              error={runError}
              methodName={problem.name}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
