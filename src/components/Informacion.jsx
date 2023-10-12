import React from 'react';
import './Informacion.css';
import { Button } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

import iconoCancion from '../images/iconoCancion.png';

const Informacion = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title') || 'Unknown Title';
    const artist = queryParams.get('artist') || 'Unknown Artist';
    const duration = queryParams.get('duration') || 'Unknown Duration';
    const description = queryParams.get('description') || 'No description available.';
    const imageUrl = queryParams.get('image');

    return (
        <div className='informacion'>
            <div className='boton-contenedor'>
                <Link to='/home'>
                    <Button circular icon='left chevron' className='boton-regresar' />
                </Link>
            </div>
            <div className='contenido'>
                <div className='imagen-contenedor'>
                    <img src={imageUrl || iconoCancion} alt='Portada de la canción' className='imagen-cancion' />
                </div>
                <div className='detalles-cancion'>
                    <h1>{title}</h1>
                    <h2>{artist}</h2>
                    <p>{duration}</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Informacion;
