import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import NavBar from "./NavBar";

export default function User({setReload, user}){

    const [products, setProducts] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const buttons = useRef(null)
    const userProductsUrl = 'https://final-project-back-1lcd.onrender.com/products/user/'

    const getProducts = async() => {
        try {
            setMensaje('Cargando productos...')
            const response = await fetch(userProductsUrl+user.name)
            if(!response.ok) throw new Error('Could not get the products for this user')
            const productos = await response.json()
            setProducts(productos)
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
            <NavBar />
            <div className="userView">
                <h2>{user.name}</h2>
                {user.age && <p>Edad: {user.age}</p>}
                <label>Descripción: </label>
                <p className="userDescription">{user.description}</p>
                <div className="botonera" ref={buttons}>
                    <button>Editar</button>
                    <button>Desconectar</button>
                </div>
            </div>
            <h4>{mensaje}</h4>
            <div className="container">
                {products && products.map(product => {
                return (
                <Link to={`/product/${product._id}`} key={product._id} className='userCard'>
                <p className='userName'>{product.name}</p>
                <p className='productOwner'>{product.owner}</p>
                <p className='productDescription'>{product.description}</p>
                <p className='productPrice'><b>{product.price+' €'}</b></p>
                </Link>
                )
            })}
            </div>
            
        </>
    )
}