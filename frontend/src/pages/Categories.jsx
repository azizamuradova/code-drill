import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/** Shows all categories from the backend. */
export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <main className='container'>
      <h1>Categories</h1>
      <div className='cat-grid'>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className='card cat-card'
          >
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
