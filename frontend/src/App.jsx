import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Problem from './pages/Problem';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {
  return (
    <div className='app'>
      <Header />
      <main className='app-main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:id' element={<Category />} />
          <Route path='/problems/:id' element={<Problem />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
