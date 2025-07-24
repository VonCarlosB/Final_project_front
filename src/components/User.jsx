import { useContext, useEffect, useRef, useState } from "react";
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";

export default function User({setReload, user}){

    const [products, setProducts] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [redirectEdit, setRedirectEdit] = useState(false)
    const [redirectNewProduct, setRedirectNewProduct] = useState(false)
    const baseUrl = import.meta.env.VITE_BASE_URL
    const userProductsUrl = baseUrl+'/products/user/'
    const { name, isAuthenticated } = useContext(AuthContext)
    const canEdit = isAuthenticated && name === user.name

    const getProducts = async() => {
        try {
            setMensaje('Cargando productos...')
            const response = await fetch(userProductsUrl+user.name)
            if(!response.ok) throw new Error('Could not get the products for this user')
            const productos = await response.json()
            if(productos.length > 0) {
                setProducts(productos)
                setMensaje('')
            }
            else{
                setProducts(null)
                setMensaje('Este usuario no tiene productos aún')
            }
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
                {canEdit && 
                <div className="botonera">
                    <button onClick={setRedirectEdit(true)}>Editar perfil</button>
                    <button onClick={setRedirectNewProduct(true)}>Nuevo producto</button>
                </div>}
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
            {redirectEdit && <Navigate to={`/${name}/edit`}/>}
            {redirectNewProduct && <Navigate to='/create'/>}
        </>
    )
}