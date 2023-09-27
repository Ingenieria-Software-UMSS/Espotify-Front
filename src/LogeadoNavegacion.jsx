import React from 'react'
import LogeadoLayout from './layouts/LogeadoLayout'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'

const LogeadoNavegacion = () => {
  return (

    <BrowserRouter>
      <LogeadoLayout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </LogeadoLayout>

    </BrowserRouter>






  )
}

export default LogeadoNavegacion
