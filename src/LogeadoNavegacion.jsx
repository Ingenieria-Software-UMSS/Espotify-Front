import React, { useState } from 'react'
import LogeadoLayout from './layouts/LogeadoLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informacion from "./components/Informacion";
import LandingPageLayout from './layouts/LandingPageLayout'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import UsuarioLogueado from './pages/UsuarioLogueado';

const LogeadoNavegacion = () => {


  const [usuario,setUsuario] = useState(undefined);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    // setUsuario({name: "Israel"});
    setUsuario(user);
  });



  if(usuario === undefined) return null;

  return ( !usuario ?
    <BrowserRouter>
  
        <Routes>
          <Route path='/' element={<LandingPageLayout />} />
          <Route path='/home' element={<LogeadoLayout><Home /></LogeadoLayout>} />
          <Route path="cancion" element={<LogeadoLayout><Informacion /></LogeadoLayout>} />
        </Routes>
  
    </BrowserRouter>
    :<UsuarioLogueado/>

    
  )
}

export default LogeadoNavegacion
