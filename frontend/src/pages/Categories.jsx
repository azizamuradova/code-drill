import { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'];

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState('all');
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const query = search.trim().toLowerCase();
  const visibleCategories = categories.filter((item) => {
    const matchesDifficulty =
      difficulty === 'all' || item.difficulty === difficulty;
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className='container page'>
      <div className='page-head'>
        <div>
          <h1>Problem categories</h1>
          <p>14 topics · 412 problems · you've solved 96 so far</p>
        </div>
        <div className='segmented'>
          <button className='active'>JavaScript</button>
        </div>
      </div>
      <div className='filters'>
        <input
          className='input'
          type='search'
          placeholder='Filter categories…'
          aria-label='Filter categories'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className='segmented'>
          {DIFFICULTIES.map((level) => (
            <button
              key={level}
              type='button'
              className={difficulty === level ? 'active' : ''}
              aria-pressed={difficulty === level}
              onClick={() => setDifficulty(level)}
            >
              {level[0].toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        <div className='spacer' />
      </div>

      <div className='cat-grid'>
        {visibleCategories.map((item) => (
          <CategoryCard item={item} key={item.id} />
        ))}
      </div>
      {visibleCategories.length === 0 && (
        <p className='muted'>No categories match your filters.</p>
      )}
    </div>
  );
}
