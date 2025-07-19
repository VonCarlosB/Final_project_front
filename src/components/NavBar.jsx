import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <nav className='navBar'>
            <Link to='/'>Desconectar</Link>
            <Link to='/users'>Usuarios</Link>
            <Link to='/products'>Productos</Link>
            <Link to='/create'>Crear Producto</Link>
        </nav>
    )
}