import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Icon, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "./IniciarSesionForm.data"
import "./IniciarSesionForm.css"

import { request, setAuthToken } from '../api/axios_helper';

const IniciarSesionForm = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValue) => {

      request('POST',
        '/login',
        {
          email: formValue.email,
          password: formValue.password
        }).then((response) => {
          console.log(response);
          setAuthToken(response.data.token);
          // this.setState({componentToSHow: "messages"});
          navigate('/principal');
          console.log("holaaa")

        }).catch((error) => {
          console.log(error);
        });

    }
  });




  return (
    <div className='login-form'>

      <h1>MÚSICA GRATIS ONLINE</h1>


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


        <Form.Button type='submit' primary fluid loading={formik.isSubmitting} className='boton-iniciar-sesion'>
          INICIAR SESIÓN
        </Form.Button>
      </Form>

      <div className='login-form-options'>
        <p> <Button as={Link} to="/home">Volver</Button></p>

      </div>
      {/* 
      <Button as={Link} to="/registro">Crear Cuenta</Button>
      <Button as={Link} to="/home">Volver</Button> */}
    </div>
  )
}

export default IniciarSesionForm