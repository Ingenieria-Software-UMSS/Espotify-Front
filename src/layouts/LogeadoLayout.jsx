
import React from 'react'
import "./Logueado.css"
import Footer from '../components/Footer';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const LogeadoLayout = (props) => {

  const { children } = props;
  return (
    <div className='logged-layout'>

      <div className='contenido'>
        {/* <div className='menu-izquierdo'>
          <p>Menu</p> 
        </div> */}

        <div className='principal'>

          <div className='barra-superior'>
            <Button as={Link} to="/registro" primary>Registrarse</Button>
            <Button as={Link} to="/login" primary>Iniciar Sesión</Button>

            <h3 className='name'>Espotify</h3>
            <img width={50} src={logo} alt='logo' className='logoLayout' />
          </div>
          <div> {children}</div>

        </div>

      </div>

      <div className='footer'>

        <Footer />
      </div>




    </div>
  )
}

export default LogeadoLayout