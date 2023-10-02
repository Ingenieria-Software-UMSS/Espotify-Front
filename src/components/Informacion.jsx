import React from 'react';
import './Informacion.css';
import { Button } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

const Informacion = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title') || "Unknown Title";
    const artist = queryParams.get('artist') || "Unknown Artist";
    const duration = queryParams.get('duration') || "Unknown Duration";
    const description = queryParams.get('description') || "No description available.";

    return (
        <div className='informacion'>
            <div className='contenido'>
                <img src='../images/gatoGrr.jpg' alt='Portada de la canción' className='imagen-cancion' />
                <div className='detalles-cancion'>
                    <h1>{title}</h1>
                    <h2>{artist}</h2>
                    <p>{duration}</p>
                    <p>{description}</p>
                </div>
            </div>
            <Link to="/">
                <Button className='boton-regresar'>Regresar</Button>
            </Link>
        </div>
    );
}

export default Informacion;
