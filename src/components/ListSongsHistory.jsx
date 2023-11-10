import React from 'react'
import { Table, Icon, TableHeader, TableBody, TableCell } from 'semantic-ui-react';
import { size, map } from 'lodash';
import "./ListSongsHistory.css"

const ListSongsHistory = (props) => {

    const { songs } = props;

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
                        </Table.Row>
                    </TableHeader>

                    <TableBody>
                        {map(songs, (song) => (
                            <Table.Row key={song.id}>
                                <Table.Cell collapsing>
                                    <Icon name='play circle outline' />
                                </Table.Cell>

                                <TableCell>{song.nombre}</TableCell>
                            </Table.Row>
                        ))}
                    </TableBody>


                </Table>
            </div>
        </div>


    )
}

export default ListSongsHistory