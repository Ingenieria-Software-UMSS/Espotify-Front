import React from 'react'
import { Await, Link } from 'react-router-dom';
import { Form, Icon, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "./RegistroForm.data";
import {Auth} from '../api/Auth'

import "./RegistroForm.css"

const auth = new Auth;



const RegistroForm = (props) => {


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {

      try {
        await auth.register(formValue.email, formValue.password);
        alert("Usuario Creado Satisfactoriamente");
      } catch (error) {
        console.error(error);
      }



    }
  });


  console.log(formik.errors)


  return (
    <div className='registro-form'>

      <h1>DISFRUTA DE TU MÚSICA CON UNA CUENTA GRATIS DE ESPOTIFY</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input

          name="email"
          type='text'
          placeholder="Correo electrónico"
          icon="mail outline"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}

        />
        <Form.Input
          name="password"
          type='password'
          placeholder="Contraseña"
          icon={
            <Icon
              name='eye'
              link
              onClick={() => console.log("Show Password")}

            />
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <Form.Input
          name="username"
          type='text'
          placeholder='Nombre de Usuario'
          icon="user circle outline"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.errors.username}
        />

        <Form.Button type='submit' primary fluid loading={formik.isSubmitting} className='boton-crear-cuenta'>
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