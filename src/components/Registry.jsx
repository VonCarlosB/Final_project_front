import { useContext, useRef, useState } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import Cookies from "js-cookie"

export default function Registry(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const { login } = useContext(AuthContext)
    const token = Cookies.get('token')

    const baseUrl = import.meta.env.VITE_BASE_URL
    const createUserURL = baseUrl+'/users/create'
    const loginUserURL = baseUrl+'/users/login'
    const buttons = useRef(null)

    const createUser = async() => {
        setMensaje('Gestionando el registro...')
        try {
            buttons.current.style.display = 'none'
            const usuario = {name: user, password}
            const response = await fetch(createUserURL,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    credentials:'include',
                    ...(token && {Authorization:`Bearer ${token}`}),
                },
                body: JSON.stringify(usuario)
            })
            const data = await response.json()
            if(!data.error){
                setMensaje('Usuario registrado correctamente')
                setTimeout(()=>{
                    login(data.token, user)
                    setRedirect(true)
                }, 1000)
            }
            setMensaje(data.error)
        } catch (error) {
            setMensaje('Error al crear el usuario')
        } finally{
            buttons.current.style.display = 'flex'
        }
    }

    const checkUser = async() => {
        setMensaje('Confirmando usuario...')
        try {
            buttons.current.style.display = 'none'
            const usuario = {name: user, password}
            const response = await fetch(loginUserURL,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    credentials:'include',
                    ...(token && {Authorization:`Bearer ${token}`}),
                },
                body: JSON.stringify(usuario)
            })
            const data = await response.json()
            if(!data.error){
                setMensaje('Bienvenido de vuelta')
                setTimeout(()=>{
                    login(data.token, user)
                    setRedirect(true)
                }, 1000)
            }
            setMensaje(data.error)
        } catch (error) {
            setMensaje('Credenciales incorrectas')
        } finally{
            buttons.current.style.display = 'flex'
        }
    }

    return(
        <>
            <h1>Registro</h1>
            <div className="registry">
                <label>Usuario</label>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)}/>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p>{mensaje}</p>
                <div className="botonera" ref={buttons}>
                    <button onClick={createUser}>Registrarse</button>
                    <button onClick={checkUser}>Entrar</button>
                </div>
            </div>
            {redirect && <Navigate replace to='/'/>}
        </>
    )
}