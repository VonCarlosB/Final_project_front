import { useContext, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export default function Product({setReload, product}){
    const buttons = useRef(null)
    const [edit, setEdit] = useState(false)
    const { name, isAuthenticated } = useContext(AuthContext)
    const canEdit = isAuthenticated && product.owner === name

    return(
        <>
            <div className="productView">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name}/>
                <h4>{product.owner}</h4>
                <p>{product.description}</p>
                <p>{product.price}€</p>
                {canEdit && 
                    <div className="botonera" ref={buttons}>
                    <button onClick={()=>setEdit(true)}>Editar</button>
                    </div>
                }
            </div>
            {edit && <Navigate replace to={`/edit/${product._id}`}/>}
        </>
    )
}