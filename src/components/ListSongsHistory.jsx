import React from 'react'
import { Table, Icon, TableHeader } from 'semantic-ui-react';
import { size, map } from 'lodash';
import "./ListSongsHistory.css"

const ListSongsHistory = (props) => {

    const {songs} = props;

    if(size(songs)===0){
        return <p className='no-songs'>No hay canciones en el historial</p>;
    }


  return (
    <Table inverted className='list-songs'>
        <TableHeader>
            <Table.Row>
                <Table.HeaderCell/>
                <Table.HeaderCell>Titulo</Table.HeaderCell>
            </Table.Row>
        </TableHeader>

    </Table>
  )
}

export default ListSongsHistory
