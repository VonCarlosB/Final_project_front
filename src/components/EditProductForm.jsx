import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"

export default function EditProductForm({setReload, product}){
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('Listo para enviar')
    const buttons = useRef(null)
    const editProductUrl = `https://final-project-back-1lcd.onrender.com/products/${product._id}`
    console.log(product._id)
    console.log(editProductUrl)
    
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
        const product = {name, description, image:null, price}
        try {
            setMensaje('Editando el producto...')
            buttons.current.style.display = 'none'
            const response = await fetch(editProductUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(product)
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
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

            <label>Descripción del producto: *</label>
            <textarea cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} required/>

            <label>Precio del producto (€):</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>
            
            <h4>{mensaje}</h4>

            <div className="botonera" ref={buttons}>
                <button type="submit">Editar</button>
                <button type="reset">Eliminar</button>
            </div>
        </form>
        {redirect && <Navigate replace to='/products'/>}
        </>
    )
}