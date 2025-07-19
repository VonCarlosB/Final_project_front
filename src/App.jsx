import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Users from './components/Users'
import Products from './components/Products'
import Product from './components/Product'
import ProductForm from './components/ProductForm'
import Home from './components/Home'

export default function App() {
    const [reload, setReload] = useState(false)
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
    }, [reload])

  return (
    <>
    <Router>
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/create' element={<ProductForm setReload={setReload}/>}/>
        {products && 
          products.map(product => <Route path={`/product/${product._id}`} element={<Product product={product}/>}/>)
        }
      </Routes>
    </Router>
    </>
  )
}