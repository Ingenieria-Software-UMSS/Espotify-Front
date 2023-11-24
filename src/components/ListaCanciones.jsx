import React, { useState, useEffect } from 'react';
import { Table, Icon, Button } from "semantic-ui-react";
import "./ListaCanciones.css";
import { UsarPlayer } from '../hooks/UsarPlayer';
import { useNavigate } from 'react-router-dom';
import Player from './Player';
import Slider from './Slider';
import { Cancion } from '../api/Cancion';
import './ResultadoBusqueda.css';

const ListaCanciones = (props) => {
    const { canciones } = props;
    const navigate = useNavigate();
    const { playCancion, play } = UsarPlayer();
    const [isLoNuevoSelected, setIsLoNuevoSelected] = useState(true);
    const [isOnline,setIsOnline] = React.useState(true);
    const cancionController = new Cancion();
    window.addEventListener('online', function () {
        setIsOnline(true);
    });

    window.addEventListener('offline', function () {
        setIsOnline(false);
    });

    const onClick = (i) => () => {
        const song = canciones[i];
        const description = `Disfruta de '${song.nombre}', interpretada por ${song.artista}.
        Una canción que te atrapará con su ritmo y letras.
        ¡Reproduce y déjate llevar durante ${song.duracion} minutos de pura magia musical!`;
        const url = `/cancion?id=${encodeURIComponent(song.id)}&title=${encodeURIComponent(song.nombre)}&artist=${encodeURIComponent(song.artista)}&duration=${encodeURIComponent(song.duracion)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(song.urlImagen)}`;
        navigate(url);
    }

    const onPlay = (item) => {
        playCancion(item);
    }

    const agregarHistorial = (item) =>{
        console.log("agregando al Hsitorial");
        console.log(item);
        console.log(item.id);
        const songToHistory = {
            "songId": item.id
        }
        cancionController.saveSongHistorial(songToHistory);
        
    }

    return (
        isOnline ? (
            <div className='list_songs_container' >
            <div className='list_songs__buttons'>
                <Button
                    onClick={() => setIsLoNuevoSelected(true)}
                    className={'botones ' + (isLoNuevoSelected && 'seleccionado')}
                >
                    Lo nuevo
                </Button>
                <Button
                    onClick={() => setIsLoNuevoSelected(false)}
                    className={'botones ' + (!isLoNuevoSelected && 'seleccionado')}
                >
                    Ultimos Artistas
                </Button>
            </div>

            <div className='tabla'>
                {isLoNuevoSelected ? (
                    <Table inverted className='lista-canciones' >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Acción</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Artista</Table.HeaderCell>
                                <Table.HeaderCell>Duración</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {[...canciones].map((cancion, i) => (
                                <Table.Row onClick={onClick(i)} key={i}>
                                    <Table.Cell>
                                        {i + 1}
                                    </Table.Cell>
                                    <Table.Cell onClick={(ev) => {
                                        ev.stopPropagation();
                                        onPlay(cancion);
                                        agregarHistorial(cancion);

                                    }}>
                                        <Icon size='big' name='play circle outline' />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <img src={cancion.urlImagen} className='miniatura'></img>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {cancion.nombre}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {cancion.artista}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {cancion.duracion}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                ) : (
                    <p className='noCanciones'>No se encontraron canciones</p>
                )}
            </div>
        </div>
        )
        :
        (
            <div className='message'>
                <Icon name='wifi' size='massive'/>
                <h1 style={{color:'white'}}>Error de conexion. Por favor, verifica tu conexion e intenta nuevamente</h1>
            </div>    
        )
    )
}

export default ListaCanciones;
