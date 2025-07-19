import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function Home(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    return(
        <>
            <h1>Registro</h1>
            <div className="registry">
                <label>Usuario</label>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required/>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <div className="botonera">
                    <button>Registrarse</button>
                    <button>Entrar</button>
                </div>
            </div>
            {redirect && <Navigate replace to='/products'/>}
        </>
    )
}