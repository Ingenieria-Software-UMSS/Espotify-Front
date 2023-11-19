import React, { useEffect, useState } from "react";
import {Button,Header,List,Popup,Table,Icon,Modal} 
from "semantic-ui-react";
import "./Favorite.css"; // Asegúrate de crear el archivo CSS correspondiente
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { UsarPlayer } from "../hooks/UsarPlayer";

import ListaCanciones from '../components/ListaCanciones';
import { Cancion } from "../api/Cancion";

const cancionController = new Cancion();

const LikeButton = ({ onClick, liked }) => {
    return (
      <Icon
        name={liked ? 'heart' : 'heart outline'}
        color={liked ? 'purple' : null}
        size="large"
        onClick={onClick}
      />
    );
  };
  
  
export default function Favorite() {
const [canciones, setCanciones] = useState([]);
const [loading, setLoading] = useState(false);
const [cancionEliminar, setCancionEliminar] = useState(null);
const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
const navigate = useNavigate();
const { playCancion} = UsarPlayer();


const initialRequest = async () => {
    setLoading(true);
    try {
    const response = await cancionController.obtenerTodas(); 
    console.log(response);
     
        setCanciones(response);

    } catch (error) {
    console.error(error);
    } finally {
     setLoading(false);
    }
};
useEffect(() => {
    initialRequest();
}, []); // Se ejecuta una vez al cargar la página
const onClick = (cancion) => {
    const description = `Disfruta de '${cancion.songTitle}', interpretada por ${cancion.artist}.x
    Una canción que te atrapará con su ritmo y letras.
    ¡Reproduce y déjate llevar durante ${cancion.songDuration} minutos de pura magia musical!`;
    const url = `/cancion?id=${encodeURIComponent(cancion.songId)}&title=${encodeURIComponent(cancion.songTitle)}&artist=${encodeURIComponent(cancion.artist)}&duration=${encodeURIComponent(cancion.songDuration)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(cancion.thumbnail?.thumbnailUrl)}`;
    navigate(url);
};

const onPlay = (cancion) => {
    playCancion({
    "artista": cancion.artist.artistName,
    "id": cancion.songId,
    "urlCancion": cancion.songUrl,
    "album": cancion.songAlbum,
    "duracion": cancion.songDuration,
    "nombre": cancion.songTitle,
    "urlImagen": cancion.thumbnail?.thumbnailUrl
    });
};
const handleEliminarCancion = (cancion) => {
    setCancionEliminar(cancion);
    setModalEliminarAbierto(true);
};
const handleConfirmEliminar = async () => {

    try {
    const response = await fetch(`/api/favoritos/${cancionEliminar.songId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        // Eliminación exitosa, actualiza la lista de canciones favoritas
        setCanciones((canciones) => canciones.filter((c) => c.songId !== cancionEliminar.songId));
    }
    } catch (error) {
    console.error(error);
    } finally {
    setCancionEliminar(null);
    setModalEliminarAbierto(false);
    }
};
return (
    <div className="favorite">
    <Header as="h1">Canciones Favoritas</Header>
    {loading ? (
        <div className="loading">
        <Icon name="spinner" loading />
        Cargando canciones favoritas...
        </div>
    ) : (
        <>
        <Table inverted className="favorite-songs">
            <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Titulo</Table.HeaderCell>
              <Table.HeaderCell>Artista</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Duración</Table.HeaderCell>
              
            </Table.Row>
            </Table.Header>
            <Table.Body>
                
            {canciones.map((canciones, i) => (
                <Table.Row onClick={() => onClick(i)} key={i}>
                <Table.Cell>{i + 1}</Table.Cell>
                <Table.Cell onClick={(env)=>{
                    eval.stopPropagation();
                    onPlay(canciones)
                }}>
                    <Icon size="large" name="play circle outline" />
                </Table.Cell>    
                
                <Table.Cell>
                    <img src={canciones.urlImagen} className='miniatura'></img>
                </Table.Cell>
                <Table.Cell>
                    {canciones.album}
                </Table.Cell>
                <Table.Cell>
                    {canciones.artista}
                </Table.Cell>
                <Table.Cell>
                    <Button icon="like" onClick={() => handleEliminarCancion(canciones)} />

                </Table.Cell> 
                <Table.Cell>
                    {canciones.duracion}
                </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        {canciones.length === 0 && (
            <p className="no-favorite-songs">No tienes canciones favoritas.</p>
        )}
        </>
    )}
    <Modal
        open={modalEliminarAbierto}
        size="tiny"
        onClose={() => setModalEliminarAbierto(false)}
    >
        <Modal.Header>Eliminar Canción Favorita</Modal.Header>
        <Modal.Content>
        <p>¿Estás seguro de que deseas eliminar esta canción de tus favoritos?</p>
        </Modal.Content>
        <Modal.Actions>
        <Button color="black" onClick={handleConfirmEliminar}>
            Aceptar
        </Button>
        <Button color="red" onClick={() => setModalEliminarAbierto(false)}>
            Cancelar
        </Button>
        </Modal.Actions>
    </Modal>
    </div>
);
}