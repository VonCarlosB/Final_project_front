import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Users(){
    const [users, setUsers] = useState(null)
    const [userInput, setUserInput] = useState('')
    const baseUrl = import.meta.env.VITE_BASE_URL
    const usersUrl = baseUrl+'/users'

    const getUsers = async (url) => {
        try {
        const res = await fetch(url)
        if(!res.ok){
            throw new Error('Problem fetching users')
        }
        const usuarios = await res.json()
        setUsers(usuarios)
        } catch (error) {
        console.error(error)
        setUsers([])
        }
    }

    const getUsersByName = () => {
        getUsers(`${usersUrl}/${userInput}`)
    }
    
    useEffect(() => {
        getUsers(usersUrl)
    }, [])

    return(
        <>
            <input 
            type='text' 
            value={userInput} 
            onChange={(e) => setUserInput(e.target.value)}
            placeholder='User name'
            />
            <button onClick={getUsersByName}>Buscar usuario</button>

            <div className='container'>
            {users && users.map(user => {
                return (
                    <Link to={`/${user.name}`} key={user._id}>
                    <div className='userCard'>
                    <p className='userName'>{user.name}</p>
                    <p>Descripción: {user.description}</p>
                    </div>
                    </Link>
                
                )
            }) || <h3>Cargando usuarios...</h3>}
            </div>
        </>
        
    )
}