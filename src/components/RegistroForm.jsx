import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Icon, Button } from 'semantic-ui-react'
import "./RegistroForm.css"

const RegistroForm = (props) => {



  return (
    <div className='registro-form'>

      <h1>DISFRUTA DE TU MÚSICA CON UNA CUENTA GRATIS DE ESPOTIFY</h1>

      <Form>
        <Form.Input
          type='text'
          placeholder="Correo electrónico"
          icon="mail outline"
        />
        <Form.Input
          type='password'
          placeholder="Contraseña"
          icon={
            <Icon
              name='eye'
              link
              onClick={() => console.log("Show Password")}

            />
          }
        />
        <Form.Input
          type='text'
          placeholder='Nombre de Usuario'
          icon="user circle outline"
        />

        <Form.Button type='submit' primary fluid className='boton-crear-cuenta'>
          Crear Cuenta
        </Form.Button>
      </Form>

      <div className='registro-form-options'>
        <p> <Button as={Link} to="/home">Volver</Button></p>
        <p className='tengo-cuenta'>TENGO UNA CUENTA <Button as={Link} to="/login">Iniciar Sesión</Button></p>
      </div>


     



    </div>
  )
}

export default RegistroForm