import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const API = 'http://localhost:3000';
const XP_PER_LEVEL = 100;
const DIFFICULTIES = ['easy', 'medium', 'hard'];

export default function Dashboard() {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${API}/users/me`, { headers }),
      fetch(`${API}/users/me/progress`, { headers }),
      fetch(`${API}/users/me/submissions`, { headers }),
    ])
      .then(async ([userRes, progressRes, submissionsRes]) => {
        if (!userRes.ok || !progressRes.ok || !submissionsRes.ok) {
          setError('Could not load your dashboard. Try logging in again.');
          return;
        }
        setUser(await userRes.json());
        setProgress(await progressRes.json());
        setSubmissions(await submissionsRes.json());
      })
      .catch(() =>
        setError('Could not reach the server. Is the backend running?'),
      );
  }, [token]);

  if (!token) return <Navigate to='/login' />;
  if (error) return <p className='container page'>{error}</p>;
  if (!user || !progress) return <p className='container page'>Loading...</p>;

  const level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
  const levelXp = progress.xp % XP_PER_LEVEL;
  const acceptanceRate = progress.submissions
    ? Math.round((progress.acceptedSubmissions / progress.submissions) * 100)
    : 0;

  return (
    <div className='container page'>
      <div className='card profile-card'>
        <div className='avatar lg'>
          {user.username.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2>{user.full_name || user.username}</h2>
          <div className='profile-meta'>
            <span>@{user.username}</span>
            <span>JavaScript</span>
          </div>
        </div>
        <div className='level-wrap'>
          <div className='row'>
            <span>
              <b>Level {level}</b>
            </span>
            <span className='subtle'>
              {levelXp} / {XP_PER_LEVEL} XP
            </span>
          </div>
          <div className='progress'>
            <span style={{ width: `${levelXp}%` }} />
          </div>
        </div>
      </div>

      <div className='stats'>
        <div className='card stat'>
          <div className='label'>✅ Problems solved</div>
          <div className='value'>{progress.solved}</div>
        </div>
        <div className='card stat'>
          <div className='label'>⭐️ Total XP</div>
          <div className='value'>{progress.xp}</div>
        </div>
        <div className='card stat'>
          <div className='label'>🎯 Acceptance rate</div>
          <div className='value'>{acceptanceRate}%</div>
        </div>
        <div className='card stat'>
          <div className='label'>📝 Submissions</div>
          <div className='value'>{progress.submissions}</div>
        </div>
      </div>

      <div className='dash-grid'>
        <div className='stack'>
          <RecentSubmissions submissions={submissions} />
        </div>
        <div className='stack'>
          <DifficultyRing
            byDifficulty={progress.byDifficulty}
            solved={progress.solved}
          />
          <CategoryProgress categories={progress.categories} />
        </div>
      </div>
    </div>
  );
}
// Table of the latest submissions//
function RecentSubmissions({ submissions }) {
  return (
    <div className='card'>
      <div className='card-head'>
        <h3>Recent submissions</h3>
      </div>
      {submissions.length === 0 ? (
        <div className='card-pad subtle'>
          No submissions yet. <Link to='/categories'>Pick a problem</Link> and
          press Submit.
        </div>
      ) : (
        <div className='table-wrap'>
          <table className='table'>
            <thead>
              <tr>
                <th>Problem</th>
                <th>Category</th>
                <th>Result</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <Link
                      to={`/problems/${submission.problem_id}`}
                      className='mono'
                    >
                      {submission.problem_name}
                    </Link>
                  </td>
                  <td className='muted'>{submission.category_name}</td>
                  <td>
                    <StatusBadge submission={submission} />
                  </td>
                  <td className='subtle'>
                    {new Date(submission.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ submission }) {
  if (submission.status === 'solved') {
    return <span className='status ok'>✓ Solved</span>;
  }
  if (submission.status === 'error') {
    return <span className='status fail'>✕ Error</span>;
  }
  return (
    <span className='status fail'>
      ✕ {submission.test_passed}/{submission.test_total}
    </span>
  );
}

// Ring chart: each difficulty takes its share of the circle//
function DifficultyRing({ byDifficulty, solved }) {
  const easy = solved ? (byDifficulty.easy / solved) * 100 : 0;
  const medium = solved ? (byDifficulty.medium / solved) * 100 : 0;
  const hard = solved ? (byDifficulty.hard / solved) * 100 : 0;
  // Each slice starts where the one before it ended
  const slices = [
    { difficulty: 'easy', percent: easy, start: 0 },
    { difficulty: 'medium', percent: medium, start: easy },
    { difficulty: 'hard', percent: hard, start: easy + medium },
  ];

  return (
    <div className='card'>
      <div className='card-head'>
        <h3>By difficulty</h3>
      </div>
      <div className='card-pad diff-ring'>
        <svg width='120' height='120' viewBox='0 0 42 42'>
          <circle
            cx='21'
            cy='21'
            r='15.9'
            fill='none'
            stroke='var(--surface-2)'
            strokeWidth='5'
          />
          {slices.map((slice) => (
            <circle
              key={slice.difficulty}
              cx='21'
              cy='21'
              r='15.9'
              fill='none'
              stroke={`var(--${slice.difficulty})`}
              strokeWidth='5'
              strokeDasharray={`${slice.percent} ${100 - slice.percent}`}
              strokeDashoffset={-slice.start}
              transform='rotate(-90 21 21)'
            />
          ))}
          <text
            x='21'
            y='21'
            textAnchor='middle'
            fontSize='8'
            fontWeight='700'
            fill='var(--text)'
          >
            {solved}
          </text>
          <text
            x='21'
            y='27'
            textAnchor='middle'
            fontSize='3.6'
            fill='var(--text-3)'
          >
            solved
          </text>
        </svg>
        <div className='diff-legend'>
          {DIFFICULTIES.map((difficulty) => (
            <div className='row' key={difficulty}>
              <span className={`badge ${difficulty}`}>
                <span className='dot' />
                {difficulty[0].toUpperCase() + difficulty.slice(1)}
              </span>
              <b>{byDifficulty[difficulty]}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// One progress bar per category//
function CategoryProgress({ categories }) {
  return (
    <div className='card'>
      <div className='card-head'>
        <h3>Category progress</h3>
        <Link to='/categories' className='btn btn-sm btn-ghost'>
          All
        </Link>
      </div>
      <div className='card-pad cat-progress'>
        {categories.map((category) => {
          const percent = category.total
            ? Math.round((category.solved / category.total) * 100)
            : 0;
          return (
            <div key={category.id}>
              <div className='row'>
                <Link to={`/categories/${category.id}`}>{category.name}</Link>
                <span>
                  {category.solved}/{category.total}
                </span>
              </div>
              <div className={`progress ${percent === 100 ? 'success' : ''}`}>
                <span style={{ width: `${percent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
