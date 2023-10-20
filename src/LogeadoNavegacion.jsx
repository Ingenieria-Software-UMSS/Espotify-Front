import React from 'react'
import LogeadoLayout from './layouts/LogeadoLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informacion from "./components/Informacion";
import LandingPageLayout from './layouts/LandingPageLayout'
import Login from './pages/Login';
import Registro from './pages/Registro';
const LogeadoNavegacion = () => {
  return (
    <BrowserRouter>
  
        <Routes>
          <Route path='/' element={<LandingPageLayout />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registro' element={<Registro/>} />
          <Route path='/home' element={<LogeadoLayout><Home /></LogeadoLayout>} />
          
          <Route path="cancion" element={<LogeadoLayout><Informacion /></LogeadoLayout>} />
        </Routes>
  
    </BrowserRouter>

    
  )
}

export default LogeadoNavegacion
