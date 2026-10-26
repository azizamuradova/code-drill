import { Link } from 'react-router-dom';

// Navbar
export default function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <Link to='/' className='logo'>
          CodeDrill
        </Link>
        <nav className='nav'>
          <Link to='/categories'>Problems</Link>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/login'>Log in</Link>
        </nav>
      </div>
    </header>
  );
}
