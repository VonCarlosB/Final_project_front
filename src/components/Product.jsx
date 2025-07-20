import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import NavBar from "./NavBar"

export default function Product({setReload, product}){
    const buttons = useRef(null)
    const [edit, setEdit] = useState(false)
    const [authUser, setAuthUser] = useState(true)

    return(
        <>
            <NavBar />
            <div className="productView">
                <h2>{product.name}</h2>
                <h4>{product.owner}</h4>
                <p>{product.description}</p>
                <p>{product.price}€</p>
                {authUser && 
                    <div className="botonera" ref={buttons}>
                    <button onClick={()=>setEdit(true)}>Editar</button>
                    </div>
                }
            </div>
            {edit && <Navigate replace to={`/edit/${product._id}`}/>}
        </>
    )
}