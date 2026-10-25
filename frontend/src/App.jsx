import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Problem from './pages/Problem';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Home</h1>} />
      <Route path='/login' element={<Login />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/categories/:id' element={<Category />} />
      <Route path='/problems/:id' element={<Problem />} />
    </Routes>
  );
}
