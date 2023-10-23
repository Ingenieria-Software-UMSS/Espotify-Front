import React from 'react'
import IniciarSesionForm from '../components/IniciarSesionForm'
import { Image } from 'semantic-ui-react';
import { logo } from '../images';
import "./Login.css"

const Login = () => {
  return (
    <div className='contenedor'>

    <div className='contenedor-formulario-login'>
        <Image
            src={logo}
            alt="Espotify"
            className='logo'
        />

      <IniciarSesionForm/>
    
    </div>

</div>
    

  )
}

export default Login

