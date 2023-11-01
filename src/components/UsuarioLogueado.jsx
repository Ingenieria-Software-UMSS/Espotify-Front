import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import "./UsuarioLogueado.css"


const UsuarioLogueado = ({ nombreUsuario }) => {

  const navigate = useNavigate();

  const cerrarSesion = () => {
    window.localStorage.setItem('auth_token', null);
    alert('La sesión ha finalizado');
    navigate('/login');
  }
  return (
    <div className='perfilUsuario'>
      <Link to='#'>
        
        <span>Username</span>
        {/* <Image/> */}
      </Link>
      <Icon name="power" onClick={cerrarSesion} link />

    </div>
  )
}

export default UsuarioLogueado