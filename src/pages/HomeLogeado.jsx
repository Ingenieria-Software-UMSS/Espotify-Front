import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const HomeLogeado = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login');
      // navigate('/home');

    }
  },[])


  return (
    <div>
      <h1>BIENVENIDO</h1>
      <Button onClick={()=>{
        localStorage.removeItem('token')
      }}>Cerrar Sesión</Button>
    </div>
  )
}

export default HomeLogeado