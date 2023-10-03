import React from 'react'
import {Table, Icon} from "semantic-ui-react"
import {map} from "lodash";
import "./ListaCanciones.css";
import { UsarPlayer } from '../hooks/UsarPlayer';


const ListaCanciones = (props) => {
  
  console.log(props);
  const {canciones} = props;
 
  const {playCancion} = UsarPlayer();

  const onPlay = (item) => {
    playCancion(item);
  }

  return (

    <Table inverted className='lista-canciones'>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell/>
                <Table.HeaderCell>TituloCancion</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Id</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {map(canciones, (cancion) => (
                <Table.Row key={cancion.id} onClick= {() => onPlay(cancion)}>
                    <Table.Cell>
                        <Icon name='play circle outline'/>
                    </Table.Cell>
                    <Table.Cell>
                        {cancion.album}
                    </Table.Cell>
                    <Table.Cell>
                        {cancion.nombre}
                    </Table.Cell>
                    <Table.Cell>
                        {cancion.id}
                    </Table.Cell>
                    
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
  )
}

export default ListaCanciones
