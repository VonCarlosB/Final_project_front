import { useEffect, useState } from 'react'
export default function Users(){
    const [users, setUsers] = useState(null)
    const [userInput, setUserInput] = useState('')
    const usersUrl = 'https://final-project-back-1lcd.onrender.com/users'

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
                <div key={user._id} className='userCard'>
                <p className='userName'>User: {user.name}</p>
                <p>Description: {user.description}</p>
                </div>
                )
            }) || <h3>Loading users...</h3>}
            </div>
        </>
        
    )
}