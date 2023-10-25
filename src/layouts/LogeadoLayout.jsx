
import React from 'react'
import "./Logueado.css"
import Footer from '../components/Footer';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

const LogeadoLayout = (props) => {

  const { children } = props;
  return (
    <div className='logged-layout'>

      <div className='contenido'>
        <div className='menu-izquierdo'>
          <p>Menu</p> 
        </div>

        <div className='principal'>
          <Link to='/'>
            <div className='barra-superior'>
              <h3 className='name'>Espotify</h3>
              <img width={50} src={logo} alt='logo' className='logoLayout'/>
            </div>
          </Link>
          <div> {children}</div>

        </div>

      </div>

      <div className='footer'>
      
        <Footer/>
      </div>




    </div>
  )
}

export default LogeadoLayout