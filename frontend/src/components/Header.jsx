import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

// Navbar
export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className='header'>
      <div className='container'>
        <Link to='/' className='logo'>
          <span className='logo-mark'>&lt;/&gt;</span>CodeDrill
        </Link>
        <nav className='nav'>
          <Link to='/' className='active'>
            Home
          </Link>
          <Link to='/categories'>Problems</Link>
        </nav>
        <div className='spacer' />

        {/* <button
          className="icon-btn"
          data-theme-toggle
          aria-label="Toggle theme"
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button> */}
        {user ? (
          <>
            <span className='subtle'>Hi, {user.username}</span>
            <button className='btn btn-sm btn-ghost' onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <Link className='btn btn-primary' to='/login'>
            Log in
          </Link>
        )}

        <button
          className='icon-btn menu-btn'
          data-menu-toggle
          aria-label='Menu'
        >
          <svg
            width={20}
            height={20}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
      </div>
    </header>
  );
}
