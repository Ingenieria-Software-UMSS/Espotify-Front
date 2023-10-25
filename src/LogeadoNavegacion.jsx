import React from 'react'
import LogeadoLayout from './layouts/LogeadoLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informacion from "./components/Informacion";
import LandingPageLayout from './layouts/LandingPageLayout'
import Registro from './pages/Registro';
import Login from './pages/Login';
import HomeLogeado from './pages/HomeLogeado';
import PlayList from './pages/playlist/PlayList';
const LogeadoNavegacion = () => {
  return (
    <BrowserRouter>
  
        <Routes>
          <Route path='/' element={<LandingPageLayout />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registro' element={<Registro/>} />
          <Route path='/home' element={<LogeadoLayout><Home /></LogeadoLayout>} />
          <Route path='/principal' element={<HomeLogeado />} />
          <Route path='/playlist/:id' element={<LogeadoLayout><PlayList /></LogeadoLayout>} />
          <Route path="cancion" element={<LogeadoLayout><Informacion /></LogeadoLayout>} />
        </Routes>
  
    </BrowserRouter>

    
  )
}

export default LogeadoNavegacion
