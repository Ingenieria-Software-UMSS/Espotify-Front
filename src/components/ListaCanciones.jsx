import React from 'react'
import {Table, Icon, Button} from "semantic-ui-react"
import "./ListaCanciones.css";
import { UsarPlayer } from '../hooks/UsarPlayer';
import { useNavigate } from 'react-router-dom';

const ListaCanciones = (props) => {
  const {canciones} = props;
  const naviagte = useNavigate();
 
  const {playCancion} = UsarPlayer();

  const onPlay = (item) => {
    playCancion(item);
  }

  return (
    <div className='list_songs_container'>
        <div className='list_songs__buttons'>
            <Button>Lo nuevo</Button>
            <Button inverted>Ultimos Artistas</Button>
        </div>
        <Table inverted className='lista-canciones'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Titulo</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Accion</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {[...canciones, ...canciones, ...canciones].map((cancion, i) => (
                    <Table.Row onClick={() => naviagte('/songs/'+cancion.id)} key={i}>
                        <Table.Cell>
                            {cancion.id}
                        </Table.Cell>
                        <Table.Cell>
                            {cancion.album}
                        </Table.Cell>
                        <Table.Cell>
                            {cancion.nombre}
                        </Table.Cell>
                        <Table.Cell onClick= {(ev) => {
                            ev.stopPropagation();
                            onPlay(cancion)}}>
                            <Icon size='large' name='play circle outline'/>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
  )
}

export default ListaCanciones
