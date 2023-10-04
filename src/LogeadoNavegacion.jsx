import React from 'react'
import LogeadoLayout from './layouts/LogeadoLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informacion from "./components/Informacion";
import LandingPageLayout from './layouts/LandingPageLayout'

const LogeadoNavegacion = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPageLayout />} />
        <Route path='/home' element={<LogeadoLayout><Home /></LogeadoLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default LogeadoNavegacion
