import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Icon, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from "./RegistroForm.data";
import "./RegistroForm.css";
import { request, setAuthToken } from '../api/axios_helper';

const RegistroForm = (props) => {



  const [mostrarPassword, setMostrarPassword] =  useState(false);

  const mostrarOcultarPass = () =>{
    setMostrarPassword(prevState => !prevState);
  }

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      request('POST',
          '/register',
          { 
            userName: formValue.username,
            email: formValue.email,
            password: formValue.password

          }).then((response) => {
            setAuthToken(response.data.token)


            alert("Usuario Creado Satisfactoriamente");

            navigate('/home',{ state: {userData: response.data.userName} });

          }).catch((error) => {
            console.log(error.response.data);
            alert("No se pudo crear el usuario");
          })
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
          type={mostrarPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={mostrarPassword ? "eye slash": "eye"}
              link
              onClick={mostrarOcultarPass}

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

        <Form.Button type='submit' primary fluid /*loading={formik.isSubmitting}*/ className='boton-crear-cuenta'>
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