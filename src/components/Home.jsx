import { useRef, useState } from "react"
import { Navigate } from "react-router-dom"

export default function Home(){
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('')
    const userURL = 'https://final-project-back-1lcd.onrender.com/users'
    const buttons = useRef(null)

    const createUser = async() => {
        setMensaje('Gestionando el registro...')
        if(user !== '' && password !== ''){
            try {
                buttons.current.style.display = 'none'
                const usuario = {name: user, password, description:null, image:null, age:null}
                const response = await fetch(userURL+'/create',{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(usuario)
                })
                if(!response.ok) throw new Error(response.message)
                else{
                    const data = await response.json()
                    console.log(data)
                    setMensaje('Usuario registrado correctamente')
                    setRedirect(true)
                }
            } catch (error) {
                setMensaje('El usuario ya existe')
            } finally{
                buttons.current.style.display = 'flex'
            }
        }else{
            setMensaje('Usuario o contraseña inválidos')
        }
    }

    const checkUser = async() => {
        setMensaje('Confirmando usuario...')
        try {
            buttons.current.style.display = 'none'
            const response = await fetch(userURL+'/'+user)
            if(!response.ok) throw new Error('Problem getting the user')
            const data = await response.json()
            const usuario = data[0]
            usuario.password === password ? setRedirect(true) : setMensaje('Usuario o contraseña incorrectos')
        } catch (error) {
            console.log(error)
            setMensaje(error)
        } finally{
            buttons.current.style.display = 'flex'
        }
    }

    return(
        <>
            <h1>Registro</h1>
            <div className="registry">
                <label>Usuario</label>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required/>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <p>{mensaje}</p>
                <div className="botonera" ref={buttons}>
                    <button onClick={createUser}>Registrarse</button>
                    <button onClick={checkUser}>Entrar</button>
                </div>
            </div>
            {redirect && <Navigate replace to='/products'/>}
        </>
    )
}