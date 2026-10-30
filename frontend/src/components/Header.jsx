import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

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

        <ThemeToggle />
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
