import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import NavBar from "./NavBar"

export default function Product({product}){
    const buttons = useRef(null)
    const [mensaje, setMensaje] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [authUser, setAuthUser] = useState(true)
    const deleteProductUrl = 'https://final-project-back-1lcd.onrender.com/products/'

    const deleteProduct = async () => {
        try {
            buttons.current.style.display = 'none'
            setMensaje('Eliminando...')
            const response = await fetch(deleteProductUrl+product._id, {
                method: 'DELETE'
            })
            if(!response.ok)throw new Error('There was an error deleting the product')
            else{
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Se ha producido un error')
            buttons.current.style.display = 'block'
        }
    }

    return(
        <>
            <NavBar />
            <div className="productView">
                <h2>{product.name}</h2>
                <h4>{product.owner}</h4>
                <p>{product.description}</p>
                <p>{product.price}€</p>
                {mensaje && <h4>{mensaje}</h4>}
                {authUser && 
                    <div className="botonera" ref={buttons}>
                    <button>Editar</button>
                    <button onClick={deleteProduct}>Eliminar</button>
                    </div>
                }
            </div>
            {redirect && <Navigate replace to='/'/>}
        </>
    )
}