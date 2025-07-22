import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NavBar(){
    const { name, isAuthenticated, logout } = useContext(AuthContext)

    return(
        <nav className='navBar'>
            {isAuthenticated && 
                <Link to='/registry' onClick={logout}>Desconectar</Link>
                || <Link to='/registry'>Registrarse</Link>
            }
            <Link to='/users'>Usuarios</Link>
            <Link to='/'>Productos</Link>
            {isAuthenticated && <Link to={`/${name}/edit`}>Editar Perfil</Link>}
            {isAuthenticated && <Link to='/create'>Crear Producto</Link>}
        </nav>
    )
}