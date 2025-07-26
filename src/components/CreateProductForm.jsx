import { useContext, useEffect, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function CreateProductForm({setReload}){
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('Listo para enviar')
    const buttons = useRef(null)
    const baseUrl = import.meta.env.VITE_BASE_URL
    const createProductUrl = baseUrl+'/products/create'
    const { token, name, isAuthenticated } = useContext(AuthContext)

    const createProduct = async (e) => {
        e.preventDefault()

        const product = new FormData()
        product.append('owner', name)
        product.append('name', productName)
        if(description !== '') product.append('description', description)
        else product.append('description', 'Este producto aún no tiene una descripción')
        product.append('image', image)
        product.append('price', price)

        try {
            setMensaje('Subiendo el producto...')
            buttons.current.style.display = 'none'
            const response = await fetch(createProductUrl,{
                method: 'POST',
                headers: {
                    credentials:'include',
                    ...(token && {Authorization:`Bearer ${token}`}),
                },
                body: product
            })
            if(!response.ok) {
                const data = await response.json()
                throw new Error('No se ha podido crear el producto\n'+data.error)
            }else{
                const data = await response.json()
                setReload(ref => !ref)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Se ha producido un error, inténtelo de nuevo')
        } finally{
            buttons.current.style.display = 'flex'
        }
    }

    const resetForm = () => {
        setProductName('')
        setDescription('')
        setImage(null)
        setPrice(0)
    }

    useEffect(()=>{
        if(!isAuthenticated) setRedirect(true)
    },[])

    return(
        <>
        <h2>Crea tu producto</h2>
        <form onSubmit={(e) => createProduct(e)} onReset={resetForm} encType="multipart/form-data">
            <label>Nombre del producto: *</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>

            <label>Descripción del producto: *</label>
            <textarea maxLength={500} cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} required/>

            <label>Precio del producto (€):</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>

            <label>Imagen:</label>
            <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
            {image && <>
                <p>{image.name}</p>
                <img className='imagePreview' src={URL.createObjectURL(image)}/>
            </>}
            
            <h4>{mensaje}</h4>

            <div className="botonera" ref={buttons}>
                <button type="submit">Crear</button>
                <button type="reset">Limpiar</button>
            </div>
        </form>
        {redirect && <Navigate replace to='/products'/>}
        </>
    )
}