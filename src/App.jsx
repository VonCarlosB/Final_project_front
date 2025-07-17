import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Products from './components/Products'

export default function App() {

  return (
    <>
    <Router>
      <nav className='navBar'>
        <Link to='/'>Inicio</Link>
        <Link to='/users'>Usuarios</Link>
        <Link to='/products'>Productos</Link>
      </nav>
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/' element={<Products/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </Router>
    </>
  )
}