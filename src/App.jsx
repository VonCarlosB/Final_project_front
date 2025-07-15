import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [users, setUsers] = useState(null)
    console.log(users)

  const getUsers = async () => {
    console.log(users)
    try {
      const res = await fetch('http://localhost:3000/products')
      if(!res.ok){
        throw new Error('Problem fetching users')
      }
      const usuarios = await res.json()
      setUsers(usuarios)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      {users && users.map(user => {
        return (
          <div key={user._id}>{user.name}</div>
          )
      })}
    </>
  )
}