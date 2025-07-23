import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Products(){
    const [products, setProducts] = useState(null)
    const [productInput, setProductInput] = useState('')
    const baseUrl = import.meta.env.VITE_BASE_URL
    const productsUrl = baseUrl+'/products'
    
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

    const getProductsByName = () => {
        if(productInput !== ''){
            getProducts(`${productsUrl}/name/${productInput}`)
        }else{
            getProducts(productsUrl)
        }
        setProductInput('')
    }

    useEffect(() => {
        getProducts(productsUrl)
    }, [])

    return(
        <>
            <input 
            type='text' 
            value={productInput} 
            onChange={(e) => setProductInput(e.target.value)}
            placeholder='Product name'
            />
            <button onClick={getProductsByName}>Buscar productos</button>

            <div className='container'>
            {products && products.map(product => {
                return (
                <Link to={`/product/${product._id}`} key={product._id} className='userCard'>
                <p className='userName'>{product.name}</p>
                <img className='productPreview' src={product.image} alt={`Imagen de ${product.name}`}/>
                <p className='productOwner'>{product.owner}</p>
                <p className='productDescription'>{product.description}</p>
                <p className='productPrice'><b>{product.price+' €'}</b></p>
                </Link>
                )
            }) || <div style={{flexDirection:'column'}}>
                <h3>Cargando productos...</h3>
                <p>Esto puede tardar un poco...</p>
            </div>}
            </div>
        </>
        
    )
}