import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Categories from './pages/Categories';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Home</h1>} />
      <Route path='/login' element={<Login />} />
      <Route path='/categories' element={<Categories />} />
    </Routes>
  );
}
