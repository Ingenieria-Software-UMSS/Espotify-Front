import React from 'react'
import { Button } from 'semantic-ui-react'


const AuthOpciones = (props) => {

  const {openIniciarSesion, openRegistro} = props;
  return (
    <div style={{backgroundColor:"#000"}}>
      {/* <h1>Opciones Autenticacion</h1> */}


      <Button primary onClick={openRegistro}>Registrarse</Button>
      <Button primary onClick={openIniciarSesion}>Iniciar Sesión</Button>
      
    </div>

    

  );
}

export default AuthOpciones
