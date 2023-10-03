import React from 'react'
import "./LandingPage.css"
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


const LandingPageLayout = () => {
    return (
        <div>
            <div className='row-container'>
                <div className='text-container'>
                    <h1>Bienvenidos a Espotify: Tu Experiencia Musical Perfecta</h1>
                    Descubre Espotify, tu destino musical definitivo.
                    Con Espotify, sumérgete en un vasto océano
                    de canciones creadas para los amantes
                    de la música como tú.
                    Explora artistas emergentes,
                    revoluciona tus listas de reproducción favoritas
                    y descubre nuevos géneros.
                    Un lugar donde la música cobra vida
                    y encuentra su espacio en tu corazón.
                    Únete a nuestra comunidad apasionada
                    y deja que Espotify te lleve en un viaje sonoro inigualable.
                </div>
                <img src="logo.png" alt="logoEspotify" className='logo' />
            </div>
            <div className='button-empezar'>
                <ButtonEmpezar />
            </div>
        </div>
    );
}

const ButtonEmpezar = () => <Button as={Link} to="home" >Empezar</Button>

export default LandingPageLayout