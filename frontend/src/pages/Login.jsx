import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Logging in with:', username, password);
  }

  return (
    <main className='container' style={{ maxWidth: 400, marginTop: 60 }}>
      <div className='card' style={{ padding: 24 }}>
        <h1>Log in</h1>
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
          <button className='btn btn-primary' type='submit'>
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
