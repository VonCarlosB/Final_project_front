import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'

export default function User({setReload, user}){

    const [products, setProducts] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const baseUrl = import.meta.env.VITE_BASE_URL
    const userProductsUrl = baseUrl+'/products/user/'

    const getProducts = async() => {
        try {
            setMensaje('Cargando productos...')
            const response = await fetch(userProductsUrl+user.name)
            if(!response.ok) throw new Error('Could not get the products for this user')
            const productos = await response.json()
            setProducts(productos.allProducts)
            setMensaje('')
        } catch (error) {
            console.log(error)
            setMensaje('Este usuario no tiene productos')
        }
    }

    useEffect(()=>{
        getProducts()
    },[])

    return(
        <>
            <div className="userView">
                <img src={user.image} alt={user.name}/>
                <div>
                    <h2>{user.name}</h2>
                    <div className="userDescription">
                        <p>Descripción: </p>
                        <p>{user.description}</p>
                    </div>
                </div>
            </div>
            <h4>{mensaje}</h4>
            {products && 
            <div className="container">
            {products.map(product => {
                return (
                <Link to={`/product/${product._id}`} key={product._id} className='userCard'>
                <p className='userName'>{product.name}</p>
                <p className='productOwner'>{product.owner}</p>
                <p className='productDescription'>{product.description}</p>
                <p className='productPrice'><b>{product.price+' €'}</b></p>
                </Link>
                )
            })}
            </div>}
            
        </>
    )
}