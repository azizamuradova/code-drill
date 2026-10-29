import { Link } from 'react-router-dom';

export default function CategoryCard({ item }) {
  return (
    <Link to={`/categories/${item.id}`} className='card cat-card'>
      <div className='cat-top'>
        <span className='cat-icon'>{item.name.slice(0, 1)}</span>
        <span className={`badge ${item.difficulty}`}>
          <span className='dot' />
          {item.difficulty}
        </span>
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </Link>
  );
}
