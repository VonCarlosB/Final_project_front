import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import NavBar from "./NavBar"

export default function CreateProductForm({setReload}){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('Listo para enviar')
    const buttons = useRef(null)
    const createProductUrl = 'https://final-project-back-1lcd.onrender.com/products/create'

    const createProduct = async (e) => {
        e.preventDefault()

        const product = new FormData()
        product.append('owner', 'Carlos')
        product.append('name', name)
        product.append('description', description)
        product.append('image', image)
        product.append('price', price)

        try {
            setMensaje('Subiendo el producto...')
            buttons.current.style.display = 'none'
            const response = await fetch(createProductUrl, {
                method: 'POST',
                body: product
            })
            if(!response.ok) {
                const error = await response.json()
                throw new Error('No se ha podido crear el producto\n'+error.message)
            }else{
                const data = await response.json()
                resetForm()
                setReload(ref => !ref)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Se ha producido un error, inténtelo de nuevo')
            buttons.current.style.display = 'flex'
        }
    }

    const resetForm = () => {
        setName('')
        setDescription('')
        setImage(null)
        setPrice(0)
    }

    return(
        <>
        <NavBar />
        <h2>Crea tu producto</h2>
        <form onSubmit={(e) => createProduct(e)} onReset={resetForm} encType="multipart/form-data">
            <label>Nombre del producto: *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>

            <label>Descripción del producto: *</label>
            <textarea cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} required/>

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