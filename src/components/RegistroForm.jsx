import React from 'react'
import { Button } from 'semantic-ui-react'

const RegistroForm = (props) => {

  const {abrirInicioSesion, volver} = props;
  return (
    <div style={{backgroundColor:"#f00"}}>

        <h1>Formulario de Registro</h1>

        <Button onClick={abrirInicioSesion}>Iniciar Sesion</Button>
        <Button onClick={volver}>Volver</Button>
        
    </div>
  )
}

export default RegistroForm
