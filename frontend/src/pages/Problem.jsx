import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/problems/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProblem(data);
        setCode(data.starter_code);
      });
  }, [id]);

  if (!problem) return <p>Loading...</p>;

  return (
    <main className='container'>
      <h1>{problem.name}</h1>
      <p>{problem.description}</p>

      <textarea
        className='textarea'
        rows={10}
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />

      <h2>Test Cases</h2>
      <ul>
        {problem.testCases.map((test) => (
          <li key={test.id}>
            Input: {JSON.stringify(test.input)} {'->'} Expected:{' '}
            {JSON.stringify(test.output)}{' '}
          </li>
        ))}
      </ul>
    </main>
  );
}
