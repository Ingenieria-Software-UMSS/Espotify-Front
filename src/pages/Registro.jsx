import React, { useState } from 'react'
import RegistroForm from '../components/RegistroForm';
import { Image } from 'semantic-ui-react';
import { logo } from '../images';
import "./Registro.css"
const Registro = () => {


    return (
        <div className='contenedor'>

            <div className='contenedor-formulario-registro'>
                <Image
                    src={logo}
                    alt="Espotify"
                    className='logo'
                />
                <RegistroForm />
            </div>

            {/* {renderForm()} */}
        </div>
    )
}

export default Registro
