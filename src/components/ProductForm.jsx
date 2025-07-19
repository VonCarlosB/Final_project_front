import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"

export default function ProductForm({setReload}){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('Listo para enviar')
    const buttons = useRef(null)
    const createProductUrl = 'https://final-project-back-1lcd.onrender.com/products/create'

    const createProduct = async (e) => {
        e.preventDefault()
        const product = {owner:'Admin', name, description, image:null, price}
        try {
            setMensaje('Subiendo el producto...')
            buttons.current.style.display = 'none'
            const response = await fetch(createProductUrl, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(product)
            })
            if(!response.ok) throw new Error('No se ha podido crear el producto')
            else{
                const data = await response.json()
                resetForm()
                setReload(ref => !ref)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Se ha producido un error, inténtelo de nuevo')
        }
    }

    const resetForm = () => {
        setName('')
        setDescription('')
        setPrice(0)
    }

    return(
        <>
        <h2>Crea tu producto</h2>
        <form onSubmit={(e) => createProduct(e)} onReset={resetForm}>
            <label>Nombre del producto: *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

            <label>Descripción del producto: *</label>
            <textarea cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} required/>

            <label>Precio del producto (€):</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>
            
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