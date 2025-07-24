import { useContext, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function EditProductForm({setReload, product}){
    const [productName, setProductName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [image, setImage] = useState(product.image)
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('Listo para enviar')
    const buttons = useRef(null)
    const baseUrl = import.meta.env.VITE_BASE_URL
    const editProductUrl = `${baseUrl}/products/${product._id}`
    const { token, name, isAuthenticated } = useContext(AuthContext)
    
    const deleteProduct = async (e) => {
        e.preventDefault()
        try {
            buttons.current.style.display = 'none'
            setMensaje('Eliminando...')
            const response = await fetch(editProductUrl, {
                method: 'DELETE'
            })
            if(!response.ok)throw new Error('There was an error deleting the product')
            else{
                setReload(ref => !ref)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Se ha producido un error')
            buttons.current.style.display = 'flex'
        }
    }

    const editProduct = async (e) => {
        e.preventDefault()

        const product = new FormData()
        product.append('name', productName)
        product.append('description', description)
        product.append('image', image)
        product.append('price', price)

        try {
            setMensaje('Editando el producto...')
            buttons.current.style.display = 'none'
            const response = await fetch(editProductUrl, {
                method: 'PUT',
                headers: {
                    credentials:'include',
                    ...(token && {Authorization:`Bearer ${token}`}),
                },
                body: product
            })
            if(!response.ok) throw new Error('No se ha podido editar el producto')
            else{
                const data = await response.json()
                setReload(ref => !ref)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Se ha producido un error, inténtelo de nuevo')
            buttons.current.style.display = 'flex'
        }
    }

    return(
        <>
        <h2>Edita tu producto</h2>
        <form onSubmit={(e) => editProduct(e)} onReset={(e) => deleteProduct(e)}>
            <label>Nombre del producto: *</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>

            <label>Descripción del producto: *</label>
            <textarea cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} required/>

            <label>Precio del producto (€):</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>

            <label>Imagen:</label>
            <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
            {image && <>
                <img className='imagePreview' src={product.image || URL.createObjectURL(image)}/>
            </>}
            {mensaje && <h4>{mensaje}</h4>}

            {isAuthenticated && <div className="botonera" ref={buttons}>
                <button type="submit">Guardar cambios</button>
                <button type="reset">Eliminar producto</button>
            </div>}
        </form>
        {redirect && <Navigate replace to='/products'/>}
        </>
    )
}