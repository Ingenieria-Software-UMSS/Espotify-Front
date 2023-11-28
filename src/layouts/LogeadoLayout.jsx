
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
import Buscador from '../components/Buscador';
import { useLocation } from 'react-router-dom';


const LogeadoLayout = (props) => {

  // const { state } = useLocation();
  // const { userData } = state
  
  const { state } = useLocation();
  const [usuario,setUsuario] = useState(undefined);



  const searchRef = React.useRef(null);

  const [logueado, setLogueado] = useState(false);


  const { children } = props;



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

  useEffect(() => {
    if(state!=null){
      const { userData } = state;
      setUsuario(userData);
    }
    
  }, [])





  let botonesUsuario;
  if (logueado) {
    
    botonesUsuario = <UsuarioLogueado nombreUsuario={usuario} />

  } else {
    botonesUsuario = <UsuarioNoLogueado />
  }



  return (


    <div className='logged-layout'>

      <div className='contenido'>
        <div className='menu-izquierdo'>
          <Aside onSearchFocus={() => {
            searchRef.current?.focus()
            console.log(searchRef);
          }}>
          </Aside>

        </div>

        <div className='principal'>

          <div className='barra-superior'>
            <Buscador 
              ref={searchRef}/>
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