import React, { useEffect, useState } from 'react'
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

  useEffect(() => {

    if (window.localStorage.getItem('auth_token') != 'null') {
      navigate('/home');
      return;
    }

  }, []);


 


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      try {
  
        await request('POST','/login',{email: formValue.email, password: formValue.password}).then((response)=>{
         
          setAuthToken(response.data.token);
          console.log(response.data);
          
          navigate('/home',{ state: {userData: response.data.userName} });
        });

      } catch (error) {
        setError(true);
        console.log(error);
      }

    }
  });


  let usuarioError;
  if (error) {
    usuarioError = <Error mensaje='Usuario Incorrecto' />
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
          INICIAR SESIÓN
        </Form.Button>
      </Form>

      <div className='login-form-options'>
        <p> <Button as={Link} to="/home">Volver</Button></p>

      </div>

    </div>
  )
}

export default IniciarSesionForm