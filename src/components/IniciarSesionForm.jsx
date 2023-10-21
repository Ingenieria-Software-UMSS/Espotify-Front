import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'



const IniciarSesionForm = () => {

  
  return (
    <div style={{backgroundColor: "#f0f"}}>
      <h1>Form Inicio de Sesion</h1>


      <Button as={Link} to="/registro">Crear Cuenta</Button>
      <Button as={Link} to="/home">Volver</Button>
    </div>
  )
}

export default IniciarSesionForm