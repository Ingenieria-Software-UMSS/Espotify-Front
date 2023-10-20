import React from 'react'
import { Button } from 'semantic-ui-react'



const IniciarSesionForm = (props) => {

  const {abrirRegistro, volver}= props;


  return (
    <div style={{backgroundColor: "#f0f"}}>
      <h1>Formulario Inicio de Sesion</h1>


      <Button primary onClick={abrirRegistro}>Crear Cuenta</Button>
      <Button secondary onClick={volver}>Volver</Button>
    </div>
  )
}

export default IniciarSesionForm