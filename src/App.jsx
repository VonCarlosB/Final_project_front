import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Users from './components/Users'
import Products from './components/Products'
import Product from './components/Product'
import CreateProductForm from './components/CreateProductForm'
import Home from './components/Home'
import EditProductForm from './components/EditProductForm'
import User from './components/User'

export default function App() {
    const [reload, setReload] = useState(false)
    const [products, setProducts] = useState(null)
    const [users, setUsers] = useState(null)
    const productsUrl = 'https://final-project-back-1lcd.onrender.com/products'
    const usersUrl = 'https://final-project-back-1lcd.onrender.com/users'

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

    const getUsers = async (url) => {
        try {
        const res = await fetch(url)
        if(!res.ok){
            throw new Error('Problem fetching users')
        }
        const usuarios = await res.json()
        setUsers(usuarios)
        } catch (error) {
        console.error(error)
        setUsers([])
        }
    }

    useEffect(() => {
        getProducts(productsUrl)
        getUsers(usersUrl)
    }, [reload])

  return (
    <>
    <Router>
      <Routes>
        <Route path='/users' element={<Users/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/create' element={<CreateProductForm setReload={setReload}/>}/>
        {products && 
          products.map(product => {
            return(
              <>
                <Route path={`/product/${product._id}`} element={<Product setReload={setReload} product={product}/>}/>
                <Route path={`/edit/${product._id}`} element={<EditProductForm setReload={setReload} product={product}/>}/>
              </>
            )
          })
        }
        {users && 
          users.map(user => {
            return(
              <>
                <Route path={`/${user.name}`} element={<User setReload={setReload} user={user}/>}/>
                <Route path={`/${user.name}/edit`} element={<EditProductForm setReload={setReload} user={user}/>}/>
              </>
            )
          })
        }
      </Routes>
    </Router>
    </>
  )
}