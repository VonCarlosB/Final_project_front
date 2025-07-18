import { useState } from "react"
import { redirect } from "react-router-dom"

export default function ProductForm(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const createProductUrl = 'https://final-project-back-1lcd.onrender.com/products/create'

    const createProduct = async (e) => {
        e.preventDefault()
        const product = {owner:'Admin', name, description, image:null, price}
        try {
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
                redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const resetForm = () => {
        setName('')
        setDescription('')
        setPrice(0)
    }

    return(
        <form onSubmit={(e) => createProduct(e)} onReset={resetForm}>
            <label>Nombre del producto: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

            <label>Descripción del producto: </label>
            <textarea cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)}/>

            <label>Precio del producto (€): </label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
            
            <div className="botonera">
                <button type="submit">Crear</button>
                <button type="reset">Limpiar</button>
            </div>
        </form>
    )
}