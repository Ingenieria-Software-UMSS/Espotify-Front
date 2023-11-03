
import React, { useEffect, useState } from 'react'
import "./Logueado.css"
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Aside from '../components/Aside';
import { Divider } from 'semantic-ui-react';
import UsuarioLogueado from '../components/UsuarioLogueado';
import UsuarioNoLogueado from '../components/UsuarioNoLogueado';
import { Axios } from 'axios';
import { set } from 'lodash';

// 



const LogeadoLayout = (props) => {

  const [logueado, setLogueado] = useState(false);
  // const [cargandoUsuario, setCargandoUsuario] = useState(true);
  // const [usuario, setUsuario] = useState(null);

  const { children } = props;



  //let tokenExiste = window.localStorage.getItem('auth_token')
  useEffect(() => {
    if (window.localStorage.getItem('auth_token') === 'null') {
      console.log(window.localStorage.getItem('auth_token'))
      console.log('token nuloo')
      setLogueado(false);
    } else {
      console.log(window.localStorage.getItem('auth_token'))
      console.log('con tokennn')
      setLogueado(true)
    }
  }, [])

  


  let botonesUsuario;
  if (logueado) {
    botonesUsuario = <UsuarioLogueado nombreUsuario='IsraelP' />

  } else {
    botonesUsuario = <UsuarioNoLogueado />
  }



  return (


    <div className='logged-layout'>

      <div className='contenido'>
        <div className='menu-izquierdo'>
          <Aside>
          </Aside>

        </div>

        <div className='principal'>

          <div className='barra-superior'>
            {botonesUsuario}

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