import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Image,Icon } from 'semantic-ui-react'
import user_default from '../assets/user-circle.png'
import "./UsuarioLogueado.css"


const UsuarioLogueado = ({ nombreUsuario }) => {

  const navigate = useNavigate();
  const avatar = user_default;

  const cerrarSesion = () => {
    window.localStorage.setItem('auth_token', null);
    alert('La sesión ha finalizado');
    navigate('/login');
  }
  return (
    <div className='perfilUsuario'>
      <div className='user-image'>
        <span>{nombreUsuario}</span>
        <Image src={avatar} className='icono-usuario'/>
      </div>
      <Icon name="power" onClick={cerrarSesion} link />

    </div>
  )
}

export default UsuarioLogueado