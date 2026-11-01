import { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const totalProblems = categories.reduce(
    (sum, category) => sum + category.problem_count,
    0,
  );
  return (
    <>
      <section className='hero'>
        <div className='container hero-grid'>
          <div>
            <span className='eyebrow'>
              <span className='badge accent'>New</span> {totalProblems}{' '}
              JavaScript problems to practice
            </span>
            <h1>
              Build coding muscle,
              <br />
              <span className='grad'>one small problem</span>
              at a time.
            </h1>
            <p className='lead'>
              Short, focused JavaScript exercises with instant feedback. Write a
              function, hit run, and see every test case light up green.
            </p>

            <div className='hero-stats'>
              <div>
                <strong>{categories.length}</strong>
                <span>Topics</span>
              </div>
              <div>
                <strong>{totalProblems}</strong>
                <span>Problems</span>
              </div>
              <div>
                <strong>JS</strong>
                <span>Language</span>
              </div>
            </div>
          </div>
          <div className='mock-editor' aria-hidden='true'>
            <div className='mock-editor-bar'>
              <i />
              <i />
              <i />
              <span>String-1 › makeAbba.js</span>
            </div>
            <pre>
              <span className='kw'>function</span>{' '}
              <span className='fn'>makeAbba</span>(a, b) {'{'}
              {'\n'}
              {'    '}
              <span className='cm'>// Return a + b + b + a</span>
              {'\n'}
              {'    '}
              <span className='kw'>return</span> a + b + b + a;{'\n'}
              {'}'}
            </pre>
            <div className='mock-tests'>
              <div>
                <span>
                  makeAbba(<span className='st'>"Hi"</span>,
                  <span className='st'>"Bye"</span>) →
                  <span className='st'>"HiByeByeHi"</span>
                </span>
                <span className='ok'>✓ OK</span>
              </div>
              <div>
                <span>
                  makeAbba(<span className='st'>"Yo"</span>,
                  <span className='st'>"Alice"</span>) →
                  <span className='st'>"YoAliceAliceYo"</span>
                </span>
                <span className='ok'>✓ OK</span>
              </div>
              <div>
                <span>
                  makeAbba(<span className='st'>"What"</span>,
                  <span className='st'>"Up"</span>) →
                  <span className='st'>"WhatUpUpWhat"</span>
                </span>
                <span className='ok'>✓ OK</span>
              </div>
              <div
                style={{
                  marginTop: '6px',
                  color: '#34d399',
                  fontWeight: 600,
                }}
              >
                <span>All 3 tests passed</span>
                <span>+10 XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='section'>
        <div className='container'>
          <div className='section-head'>
            <div>
              <h2>Pick a topic</h2>
              <p>
                Each set goes from warm-up to tricky. Solve them in order or
                jump around.
              </p>
            </div>
            <div className='segmented lang-switch'>
              <button className='active'>JavaScript</button>
            </div>
          </div>
          <div className='cat-grid'>
            {categories.map((item) => (
              <CategoryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section className='section' style={{ paddingTop: '8px' }}>
        <div className='container'>
          <div className='section-head'>
            <div>
              <h2>Why practice here</h2>
            </div>
          </div>
          <div className='features'>
            <div className='card feature'>
              <div className='feature-icon'>
                <svg
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path d='M13 2 3 14h9l-1 8 10-12h-9l1-8z' />
                </svg>
              </div>
              <h3>Instant feedback</h3>
              <p>
                Run your code against every test case in under a second and see
                exactly which inputs fail.
              </p>
            </div>
            <div className='card feature'>
              <div className='feature-icon'>
                <svg
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path d='M3 3v18h18' />
                  <path d='m7 15 4-4 3 3 5-6' />
                </svg>
              </div>
              <h3>Track your progress</h3>
              <p>
                Streaks, XP, per-topic progress and a full history of every
                attempt you've made.
              </p>
            </div>
            <div className='card feature'>
              <div className='feature-icon'>
                <svg
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path d='M12 5v14M5 12h14' />
                </svg>
              </div>
              <h3>Earn XP</h3>
              <p>
                Every problem you solve gives you XP and shows up on your
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
