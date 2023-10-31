import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Icon, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "./IniciarSesionForm.data"
import "./IniciarSesionForm.css"

import { request, setAuthToken } from '../api/axios_helper';
import Error from './Error';

const IniciarSesionForm = () => {

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const mostrarOcultarPass = () => {
    setMostrarPassword(prevState => !prevState);
  }



  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
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

        }).catch((error) => {
          setError(true);
          console.log(error);

        });

      //setError(false);

    }
  });


  let usuarioError;
  if (error) {
    usuarioError = <Error mensaje='!Usuario Incorrecto¡' />
  }


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
          type={mostrarPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={mostrarPassword ? "eye slash" : "eye"}
              link
              onClick={mostrarOcultarPass}

            />
          }
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}

        />
        <dir>
          {usuarioError}
        </dir>

        <Form.Button type='submit' primary fluid loading={formik.isSubmitting} className='boton-iniciar-sesion'>
          INICIAR SESIÓNn
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