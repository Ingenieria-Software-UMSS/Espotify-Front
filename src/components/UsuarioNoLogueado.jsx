
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg';
import { Button } from 'semantic-ui-react'

import "./UsuarioNoLogueado.css"

const UsuarioNoLogueado = () => {
    return (
        <div className='EncabezadoBotones'>
            <Button as={Link} to="/registro" primary>Registrarse</Button>
            <Button as={Link} to="/login" primary>Iniciar Sesión</Button>
            <Link to="/" style={{display: 'flex', color: 'white', alignItems: 'center'}}>
                <h3 className='name'>Espotify</h3>
                <img width={50} src={logo} alt='logo' className='logoLayout' />
            </Link>
            
        </div>
    )
}

export default UsuarioNoLogueado