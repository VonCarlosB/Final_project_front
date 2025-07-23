import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('token') || null)
    const [name, setName] = useState(Cookies.get('name') || null)
    const isAuthenticated = !!token

    const login = (newToken, newName) => {
        Cookies.set('token', newToken, { expires:1 })
        setToken(newToken)
        Cookies.set('name', newName, { expires:1 })
        setName(newName)
    }

    const logout = () => {
        Cookies.remove('token')
        setToken(null)
        Cookies.remove('name')
        setName(null)
    }

    useEffect(() => {
        const saved = Cookies.get('token')
        if(saved) setToken(saved)

        const newName = Cookies.get('name')
        if(newName) setName(newName)
    }, [])

    return(
        <AuthContext.Provider value={{ token, name, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}