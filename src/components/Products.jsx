import { useEffect, useState } from 'react'

export default function Products(){
    const [products, setProducts] = useState(null)
    const [productInput, setProductInput] = useState('')
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
        }
    }

    const getProductsByName = () => {
        productInput
        getProducts(`${productsUrl}/name/${productInput}`)
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
                <div key={product._id} className='userCard'>
                <p className='userName'>{product.name}</p>
                <p>Descripción: {product.description}</p>
                <p>{product.owner}</p>
                <p><b>{product.price+' €'}</b></p>
                </div>
                )
            }) || <h3>Loading products...</h3>}
            </div>
        </>
        
    )
}