import React from 'react';
import { Image, Input, Icon } from 'semantic-ui-react';
import Player from './Player';
import { UsarPlayer } from '../hooks/UsarPlayer';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
    const navigate = useNavigate();

    const { cancion, volumen, setVolumen } = UsarPlayer();


    const { artista, nombre, urlImagen } = cancion ?? {};

    const [mute, setMute] = useState(false);

    const [bloqueoBarra, setBloqueoBarra] = useState(false);

    const onImageClick = () => {
        if (cancion) {
            const description = `Disfruta de '${cancion.nombre}', interpretada por ${cancion.artista}.
            Una canción que te atrapará con su ritmo y letras.
            ¡Reproduce y déjate llevar durante ${cancion.duracion} minutos de pura magia musical!`;
            const url = `/cancion?title=${encodeURIComponent(cancion.nombre)}&artist=${encodeURIComponent(cancion.artista)}&duration=${encodeURIComponent(cancion.duracion)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(cancion.urlImagen)}`;
            navigate(url);
        }
    };


    function VolumeBtns () {

        return  mute
            ? <Icon name='volume off' onClick = {()=> {setMute(!mute); setBloqueoBarra(false)}}/>
            : volumen <= 0.05 ? <Icon name='volume off' onClick = {()=> {setMute(!mute); setBloqueoBarra(true)}}/>
            : volumen <= 0.49 ? <Icon name='volume down' onClick = {()=> {setMute(!mute); setBloqueoBarra(true)}} />
            : <Icon name='volume up' onClick = {()=> {setMute(!mute); setBloqueoBarra(true)}} />
    }


    return (
        <div className='footer'>
            <div className='footerIzquierda'>
                {cancion && <Image src={urlImagen} className='imagenMiniatura' onClick={onImageClick} />}
                <div className='infoCancion'>
                    {cancion && <p>{nombre}</p>}
                    {cancion && <p>{artista}</p>}
                </div>
            </div>

            <div className='footerCentro'>
                <Player mute={mute}/>
            </div>

            <div className='footerDerecha'>
                
                    
                { <VolumeBtns setMute={setMute}/> }
                <input
                   
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                    value={volumen}
                   
                    onChange={event => setVolumen(Number(event.target.value))}
                    disabled = {bloqueoBarra}
                />
            </div>
        </div>
    );
};

export default Footer;
