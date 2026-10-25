import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Category() {
  const [problems, setProblems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${id}/problems`)
      .then((response) => response.json())
      .then((data) => setProblems(data));
  }, [id]);

  return (
    <main className='container'>
      <h1>Problems</h1>
      <div className='cat-grid'>
        {problems.map((problem) => (
          <Link
            key={problem.id}
            to={`/problems/${problem.id}`}
            className='card cat-card'
          >
            <h3>{problem.name}</h3>
            <p>{problem.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
