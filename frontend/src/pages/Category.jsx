import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Category() {
  const [problems, setProblems] = useState([]);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  const category = categories.find((item) => item.id === Number(id));

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${id}/problems`)
      .then((response) => response.json())
      .then((data) => setProblems(data));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="page">
      <div className="container layout-sidebar">
        <aside className="card side-nav">
          <h4>Categories</h4>
          {categories.map((item) => (
            <Link
              key={item.id}
              className={item.id === Number(id) ? 'active' : ''}
              to={`/categories/${item.id}`}
            >
              {item.name}
            </Link>
          ))}
        </aside>
        <section>
          <div className="breadcrumb">
            <Link to="/categories">Problems</Link>
            <span>/</span>
            <span>{category?.name}</span>
          </div>
          <div className="page-head" style={{ marginBottom: '20px' }}>
            <div>
              <div className="row">
                <span className="cat-icon" style={{ '--c': '#7c3aed' }}>
                  {category?.name.slice(0, 1)}
                </span>
                <h1>{category?.name}</h1>
              </div>
              <p>{category?.description}</p>
            </div>
          </div>

          <div className="card">
            <ul className="problem-list">
              {problems.map((item) => (
                <li key={item.id} className="problem-item">
                  <span className="check">
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <div>
                    <Link to={`/problems/${item.id}`} className="title">
                      {item.name}
                    </Link>
                    <div className="desc">{item.description}</div>
                  </div>
                  <span className={`badge ${item.difficulty} hide-sm`}>
                    {item.difficulty}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
