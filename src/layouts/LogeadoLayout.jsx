
import React, { useState } from 'react'
import "./Logueado.css"
import Footer from '../components/Footer';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import AuthOpciones from '../components/AuthOpciones';
import IniciarSesion from '../components/IniciarSesion';
import Registro from '../components/Registro';

const LogeadoLayout = (props) => {



  const { children } = props;
  return (
    <div className='logged-layout'>

      <div className='contenido'>
        {/* <div className='menu-izquierdo'>
          <p>Menu</p> 
        </div> */}

        <div className='principal'>
          {/* <Link to='/'>
            <div className='barra-superior'>
              <h3 className='name'>Espotify</h3>
              <img width={50} src={logo} alt='logo' className='logoLayout'/>
              

            </div>
          </Link> */}
          <div className='barra-superior'>
            <AuthOpciones/>
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