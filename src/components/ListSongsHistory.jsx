import React from 'react'
import { Table, Icon, TableHeader, TableBody, TableCell } from 'semantic-ui-react';
import { size, map } from 'lodash';
import { UsarPlayer } from '../hooks/UsarPlayer';
import "./ListSongsHistory.css"
import { Cancion } from '../api/Cancion';

const ListSongsHistory = (props) => {

    const cancionController = new Cancion();

    const { songs } = props;
    
    const {playCancion} = UsarPlayer();

    const onPlay=(item)=>{
        playCancion(item);
    }

    if (size(songs) === 0) {
        return <p className='no-songs'>No hay canciones en el historial</p>;
    }

    const eliminarCancion =(cancion)=>{
        console.log("eliminandoooooo");
        console.log(cancion.id);
        try {
            cancionController.deleteSongHistorial(cancion.id);
            
        } catch (error) {
            console.log(error);
        }
        
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

                                <Table.Cell style={{"text-align":"right"}} onClick={(ev) =>{
                                    ev.stopPropagation();
                                    // onPlay(cancion)
                                    eliminarCancion(song);
                                }}>
                    
                                    <Icon size='large'   name='trash' />
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
