import React from 'react'
import LogeadoLayout from './layouts/LogeadoLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informacion from "./components/Informacion";

const LogeadoNavegacion = () => {
  return (

    <BrowserRouter>
      <LogeadoLayout>
        <Routes>
          <Route path='/' element={<Home />} />
            <Route path="cancion" element={<Informacion />} />
        </Routes>

      </LogeadoLayout>

    </BrowserRouter>
  )
}

export default LogeadoNavegacion
