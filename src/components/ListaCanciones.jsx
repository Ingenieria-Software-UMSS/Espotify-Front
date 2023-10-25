import React, { useState } from 'react';
import { Table, Icon, Button } from "semantic-ui-react";
import "./ListaCanciones.css";
import { UsarPlayer } from '../hooks/UsarPlayer';
import { useNavigate } from 'react-router-dom';

const ListaCanciones = (props) => {
    const { canciones } = props;
    const navigate = useNavigate();
    const { playCancion, play } = UsarPlayer();
    const [isLoNuevoSelected, setIsLoNuevoSelected] = useState(true);

    const onClick = (i) => () => {
        const song = canciones[i];
        const description = `Disfruta de '${song.songTitle}', interpretada por ${song.artist.artistName}.
        Una canción que te atrapará con su ritmo y letras.
        ¡Reproduce y déjate llevar durante ${song.songDuration} minutos de pura magia musical!`;
        const url = `/cancion?title=${encodeURIComponent(song.songTitle)}&artist=${encodeURIComponent(song.artist.artistName)}&duration=${encodeURIComponent(song.songDuration)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(song.thumbnail.thumbnailUrl)}`;
        navigate(url);
    }

    const onPlay = (item) => {
        playCancion(item);
    }

    return (
        <div className='list_songs_container'>
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
                {canciones.length > 0 ? (
                    <Table inverted className='lista-canciones'>
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
                                        onPlay(cancion)
                                    }}>
                                        <Icon size='large' name='play circle outline' />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <img src={cancion.thumbnail.thumbnailUrl} className='miniatura' alt={cancion.songTitle}></img>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {cancion.songTitle}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {cancion.artist.artistName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {cancion.songDuration}
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
}

export default ListaCanciones;