import React from 'react'
import LogeadoLayout from './layouts/LogeadoLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informacion from "./components/Informacion";
import LandingPageLayout from './layouts/LandingPageLayout'
import PlayList from './pages/playlist/PlayList';
const LogeadoNavegacion = () => {
  return (
    <BrowserRouter>
  
        <Routes>
          <Route path='/' element={<LandingPageLayout />} />
          <Route path='/home' element={<LogeadoLayout><Home /></LogeadoLayout>} />
          <Route path="cancion" element={<LogeadoLayout><Informacion /></LogeadoLayout>} />
          <Route path="playlist" element={<LogeadoLayout><PlayList /></LogeadoLayout>} />
        </Routes>
  
    </BrowserRouter>

    
  )
}

export default LogeadoNavegacion
