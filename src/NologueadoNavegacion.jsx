import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import LandingPageLayout from './layouts/LandingPageLayout'
import Auth from './components/Auth'
import LogeadoNavegacion from './LogeadoNavegacion'



const NologueadoNavegacion = () => {

    

     return (

        <></>
        // <BrowserRouter>

        //     {/* <Routes>
        //         <Route path='/' element={<LandingPageLayout />} />
        //         <Route path='/auth' element={<Auth />} />
        //     </Routes> */}

        // </BrowserRouter>


    ) 
}

export default NologueadoNavegacion
