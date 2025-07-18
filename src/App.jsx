import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Products from './components/Products'
import { useEffect, useState } from 'react'
import Product from './components/Product'
import ProductForm from './components/ProductForm'

export default function App() {
    const [products, setProducts] = useState(null)
    const productsUrl = 'https://final-project-back-1lcd.onrender.com/products'

    const getProducts = async (url) => {
        try {
        const res = await fetch(url)
        if(!res.ok){
            throw new Error('Problem fetching products')
        }
        const productos = await res.json()
        setProducts(productos)
        } catch (error) {
        console.error(error)
        setProducts([])
        }
    }

    useEffect(() => {
        getProducts(productsUrl)
    }, [])

  return (
    <>
    <Router>
      <nav className='navBar'>
        <Link to='/'>Inicio</Link>
        <Link to='/users'>Usuarios</Link>
        <Link to='/products'>Productos</Link>
        <Link to='/create'>Crear Producto</Link>
      </nav>
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/' element={<Products/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/create' element={<ProductForm/>}/>
        {products && 
          products.map(product => <Route path={`/product/${product._id}`} element={<Product product={product}/>}/>)
        }
      </Routes>
    </Router>
    </>
  )
}