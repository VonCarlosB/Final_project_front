# Frontend expositor de productos con autenticación Node.js + React

Este proyecto es un **expositor de productos** de acceso público que no necesita registro para ser consultado. Con capacidad para registrarse e iniciar sesión para poder publicar y editar productos propios.
Para llevar a cabo esta tarea se ha conectado una base de datos, gestionada a través del back-end [https://github.com/VonCarlosB/Final_project_back](https://github.com/VonCarlosB/Final_project_back) y una sección front-end (este repositorio)

El servicio web está desplegado de forma activa en [https://expositorweb.netlify.app](https://expositorweb.netlify.app)

---

## Tecnologías usadas

### Backend

[https://github.com/VonCarlosB/Final_project_back](https://github.com/VonCarlosB/Final_project_back)

### Frontend

- JSCookie
- React
- React-dom
- React-router-dom

---

## Funcionalidades principales

- Consulta de todos los productos disponibles
- Búsqueda de productos por nombre
- Consulta de todos los usuarios disponibles
- Búsqueda de usuarios por nombre
- Perfil de usuario con sus productos
- Registro de nuevos usuarios
- Inicio de sesión de usuarios existentes
- Persistencia de sesión entre recargas de página
- Cierre de sesión desde cualquier parte de la web
- Posibilidad de crear y actualizar productos al estar registrado en la web

---

## Estructura de carpetas

<pre>
├── src/
│   ├── components/
│   │   ├── CreateProductForm.jsx
│   │   ├── EditProductForm.jsx
│   │   ├── EditUserForm.jsx
│   │   ├── NavBar.jsx
│   │   ├── Product.jsx
│   │   ├── Products.jsx
│   │   ├── Registry.jsx
│   │   ├── User.jsx
│   │   └── Users.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   └── main.jsx
</pre>

## Contexto de autenticación

Se usa `AuthContext` para:
- Saber si el usuario está autenticado (`isAhuthenticated`)
- Ejecutar funciones globales como `logout()`
- Tener datos globales como el nombre del usuario registrado o el token que utiliza (`name`, `token`)

## Variables de entorno

Para facilitar el cambio entre desarrollo y producción, este proyecto tiene una variable de entorno en la que se encuentra la URL base de la base de datos:
`VITE_BASE_URL = BackendURL`

## Uso de la web

La plataforma web presenta dos opciones, al tratarse de un expositor podemos encontrar al usuario que mantiene y alimenta la exposición, creando y actualizando sus productos y modificando su perfil; y al usuario anónimo o no que consume la exposición, viendo y consultando productos y usuarios registrados.

### Opciones generales

Todos los usuarios de la web, registrados o no, podrán consultar todos los productos y usuarios registrados que hay en la base de datos. Los nombres, descripciones, imágenes y demás parámetros son públicos para consulta.
Cualquier usuario podrá hacer búsquedas por nombre de productos o de usuarios, reduciendo el número de elementos que se muestran en la página web.

### Opciones con autenticación

Los usuarios autenticados podrán crear nuevos productos desde su perfil o editar los que ya hayan publicado. Además podrán editar sus propios perfiles exponiendo su trabajo y motivación.

## Despliegue

El uso de este código require tener Node.js instalado.

Para utilizar el código de este proyecto deberá descargarse en una carpeta y comenzar ejecutando el comando `npm i` para instalar las dependencias de los paquetes de Node.

A continuación se debe crear un archivo .env donde se debe colocar la variables de entorno expuesta previamente.

Por último se ejecutará el comando `npm run dev` que ejecutará el servicio en local.
