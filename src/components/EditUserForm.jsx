import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function EditUserForm({setReload, user}){
    const [redirect, setRedirect] = useState(false)
    const { name, logout } = useContext(AuthContext)

    useEffect(()=>{
        if(name !== user.name){
            setRedirect(true)
        }
    },[])

    return(
        <>
            <h2>Por hacer formulario de edición de usuario</h2>
            <h2>{user.name}</h2>
            {redirect && <Navigate replace to='/users'/>}
        </>
    )
}