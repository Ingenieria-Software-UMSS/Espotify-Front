import React from 'react'
import { Table, Icon, TableHeader, TableBody, TableCell } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { UsarPlayer } from '../hooks/UsarPlayer';
import "./ListSongsHistory.css"

const ListSongsHistory = (props) => {

    const { songs } = props;
    const {playCancion} = UsarPlayer();

    const onPlay=(item)=>{
        playCancion(item);
    }

    if (size(songs) === 0) {
        return <p className='no-songs'>No hay canciones en el historial</p>;
    }


    return (
        <div className='tabla-contenedor'>
            <div className='tabla-historial'>
                <Table inverted className='list-songs'>
                    <TableHeader>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Titulo</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </TableHeader>

                    <TableBody>
                        {map(songs, (song) => (
                            <Table.Row key={song.id} onClick={()=> onPlay(song)}>
                                <Table.Cell collapsing>
                                    <Icon name='play circle outline' />
                                </Table.Cell>

                                <TableCell>{song.nombre}</TableCell>

                                <Table.Cell onClick={(ev) =>{
                                    ev.stopPropagation();
                                    // onPlay(cancion)
                                    console.log('eliminandoCancion')
                                }}>
                    
                                    <Icon size='large'  onClick={console.log("eliminar Cancion de Historial")} name='trash' />
                                </Table.Cell>
                                


                            </Table.Row>
                        ))}
                    </TableBody>


                </Table>
            </div>
        </div>


    )
}

export default ListSongsHistory
