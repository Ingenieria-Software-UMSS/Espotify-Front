import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const HomeLogeado = () => {

  // const navigate = Navigate();
  const navigate = useNavigate();

  useEffect(()=>{
    if(window.localStorage.getItem('auth_token')===null){

      // console.log("dentro el if")
      navigate('/login');
      // console.log("saliendo del if")
      // navigate('/home');
    }
  },[])


  return (
    <div>
      <h1>BIENVENIDO</h1>
      <Button onClick={()=>{
        // localStorage.removeItem('token')
        window.localStorage.setItem('auth_token',null);
        navigate('/login');
      }}>Cerrar Sesión</Button>
    </div>
  )
}

export default HomeLogeado