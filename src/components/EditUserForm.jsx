import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function EditUserForm({setReload, user}){
    const [redirect, setRedirect] = useState(false)
    const [mensaje, setMensaje] = useState('No olvides guardar los cambios')
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState(user.description)
    const [age, setAge] = useState(user.age)
    const buttons = useRef(null)
    const baseUrl = import.meta.env.VITE_BASE_URL
    const editUserUrl = `${baseUrl}/users/${user._id}`
    const { token, name } = useContext(AuthContext)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const user = new FormData()
        if(description !== '') user.append('description', description)
        else user.append('description', 'Este usuario aún no tiene una descripción')
        user.append('image', image)
        user.append('age', age)

        try {
            setMensaje('Editando el perfil...')
            buttons.current.style.display = 'none'
            const response = await fetch(editUserUrl, {
                method: 'PUT',
                headers: {
                    credentials:'include',
                    ...(token && {Authorization:`Bearer ${token}`}),
                },
                body: user
            })
            const data = await response.json()
            if(!response.ok) throw new Error(data.error)
            else{
                setReload(ref => !ref)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Se ha producido un error, inténtalo de nuevo')
            buttons.current.style.display = 'block'
        }
    }

    useEffect(()=>{
        if(name !== user.name){
            setRedirect(true)
        }
    },[])

    return(
        <>
            <h2>Por hacer formulario de edición de usuario</h2>
            <h2>{user.name}</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Imagen de perfil</label>
                <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                {image &&
                    <img className='imagePreview' src={URL.createObjectURL(image)}/>
                ||
                    <img className='imagePreview' src={user.image}/>
                }
                <label>Descripción</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label>Edad</label>
                <input type="number" min={0} value={age} onChange={(e) => setAge(e.target.value)} style={{width:'40px'}}/>
                <button type="submit" ref={buttons} style={{width:'30%', margin:'auto'}}>Guardar cambios</button>
                {mensaje && <h5>{mensaje}</h5>}
            </form>
            {redirect && <Navigate replace to={`/${user.name}`}/>}
        </>
    )
}