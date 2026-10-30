import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const response = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setError(await response.text());
      return;
    }

    const token = await response.text();
    login(token);
    navigate('/');
  }

  return (
    <div className='container page' style={{ maxWidth: 400, marginTop: 60 }}>
      <div className='card' style={{ padding: 24 }}>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              className='input'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className='input'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='btn btn-primary' type='submit'>
            Create account
          </button>
        </form>
      </div>
      <div>
        Already have an account?
        <Link to='/login'> Log in</Link>
      </div>
    </div>
  );
}
