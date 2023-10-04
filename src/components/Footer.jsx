import React from 'react';
import { Image, Input, Icon } from 'semantic-ui-react';
import Player from './Player';
import { UsarPlayer } from '../hooks/UsarPlayer';
import './Footer.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const { cancion, volumen, setVolumen } = UsarPlayer();

    const { artista, nombre, urlImagen } = cancion ?? {};

    const onImageClick = () => {
        if (cancion) {
            const description = `Disfruta de '${cancion.nombre}', interpretada por ${cancion.artista}.
            Una canción que te atrapará con su ritmo y letras.
            ¡Reproduce y déjate llevar durante ${cancion.duracion} minutos de pura magia musical!`;
            const url = `/cancion?title=${encodeURIComponent(cancion.nombre)}&artist=${encodeURIComponent(cancion.artista)}&duration=${encodeURIComponent(cancion.duracion)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(cancion.urlImagen)}`;
            navigate(url);
        }
    };

    return (
        <div className='footer'>
            <div className='footerIzquierda'>
                <Image src={urlImagen} className='imagenMiniatura' onClick={onImageClick} />
                <div className='infoCancion'>
                    {cancion && <p>{nombre}</p>}
                    {cancion && <p>{artista}</p>}
                </div>
            </div>

            <div className='footerCentro'>
                <Player />
            </div>

            <div className='footerDerecha'>
                <Input
                    label={<Icon name='volume up' className='iconVolumen' />}
                    type='range'
                    min={0}
                    max={1}
                    step={0.01}
                    value={volumen}
                    onChange={(_, data) => setVolumen(Number(data.value))}
                />
            </div>
        </div>
    );
};

export default Footer;
