import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Confirm,
  Dimmer,
  Dropdown,
  Header,
  Loader,
  Popup,
  Table,
  Icon,
  Modal
} from "semantic-ui-react";
import "./playlist.css";

import logo from "../../assets/bg.png";
import request, { getOptions } from "../../utils/request";
import PlayListForm from "../../components/PlayListForm";
import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { UsarPlayer } from "../../hooks/UsarPlayer";
import { Link } from "react-router-dom";

const initialForm = {
  playListName: "Nuevo Playlist",
  playListDescription: "Description del nuevo playlist",
  thumbnail: {
    thumbnailUrl: logo,
  } 
};

export default function PlayList() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({...initialForm});
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const params = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if(params.id === 'create') {
      setState({...initialForm});
    } else {
      initialRequest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const initialRequest = async () => {

    setLoading(true);

    try {
      const options = getOptions();
      const uri = '/play-list/' + params.id;
      const paylist = await request(uri, options);

      setState({
        playListId: paylist.playListId,
        playListName: paylist.playListName,
        playListDescription: paylist.playListDescription,
        thumbnail: paylist?.thumbnail,
      })
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleConfirm = () => {

  }
  const [fecha, setFecha] = useState([]);
  
  const navigate = useNavigate();
  const onClick = (song) => {
    // const song = canciones[i];
    const description = `Disfruta de '${song.songTitle}', interpretada por ${song.artist}.
      Una canción que te atrapará con su ritmo y letras.
      ¡Reproduce y déjate llevar durante ${song.songDuration} minutos de pura magia musical!`;
    const url = `/cancion?id=${encodeURIComponent(song.songId)}&title=${encodeURIComponent(song.songTitle)}&artist=${encodeURIComponent(song.artist)}&duration=${encodeURIComponent(song.songDuration)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(song.thumbnail.thumbnailUrl)}`;
    navigate(url);
  }
  const { playCancion, play } = UsarPlayer();

  const onPlay = (item) => {
      playCancion({
      "artista": item.artist.artistName,
      "id": item.songId,
      "urlCancion": item.songUrl,
      "album": item.songAlbum,
      "duracion": item.songDuration,
      "nombre": item.songTitle,
      "urlImagen": item.thumbnail.thumbnailUrl
    });
  }
  const [canciones, setCanciones] = React.useState([]);
  const [hayCanciones, setHayCanciones] = React.useState(false);
  const [abrir, setAbrir] = useState(false);
  const [cancionEliminar, setCancionEliminar] = useState(null);


  const obtenerCanciones = useCallback(() => {
    fetch("https://espotify.azurewebsites.net/play-list/" + params.id)
    // fetch("http://localhost:8080/play-list/" + params.id)
      .then((res) => res.json())
      .then((json) => {
        setCanciones(json.playListSongList);
        setHayCanciones(json.playListSongList.length > 0);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

  React.useEffect(() => {
    obtenerCanciones();
  }, [obtenerCanciones]);


  const modalEliminarAbierto = cancionEliminar !== null;
  const modalEliminar = (
    <Modal
      open={modalEliminarAbierto}
      onClose={() => setCancionEliminar(null)}
      size="tiny"
    >
      <Modal.Content className='modalEliminar_contenedor'>
        <div className='mensaje'>
          <h1>¿Estas seguro que deseas eliminar?</h1>
        </div>
        <div className="botones_contenedor">

          <Button className='modal_botonAceptar' color='black' onClick={() => {
            fetch(`https://espotify.azurewebsites.net/play-list-song/${cancionEliminar.playListSongId}`, {
            // fetch(`http://localhost:8080/play-list-song/${cancionEliminar.playListSongId}`, {

              method: "DELETE", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin

            }).then((res) => {
              setCancionEliminar(null);
              obtenerCanciones();
              if (res.ok) {
                console.log("ok");
              } else {
                console.log("noOK");
              }
            }).catch((error) => {

              console.log("no se pudo eliminar");
              console.error(error);
            }
            )

          }}>Aceptar</Button>
          <Button 
            onClick={() => setCancionEliminar(null)} 
            className='modal_botonCancelar' 
            color='red'>Cancelar</Button>

        </div>
      </Modal.Content>
    </Modal>
  )

  return (
    <>
      <div className="playlist">
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <div className="playlist_banner">
          <div className='boton-contenedor'>
            <Link to='/home'>
              <Button circular icon='left chevron' className='boton-regresar' />
            </Link>
          </div>
          <img
            className="playlist_img"
            onClick={handleOpen}
            src={state.thumbnail.thumbnailUrl}
            alt="playlist_image"
          />
          <div className="song_area" onClick={handleOpen}>
            <Header as="h4">Playlist</Header>
            <div className="playlist-titulo">

              <Header as="h1">{state.playListName}</Header>
              <div className="playlist-titulo-botones">
                <Button
                  icon="play"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onPlay(canciones[0].song)
                  }}
                  
                ></Button>
                <Button
                  icon="sync"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onPlay(canciones[0].song)
                  }}></Button>
              </div>
            </div>

            <div className="cantidadCanciones">
              <p>Cantidad de canciones en la playlist {canciones.length}</p>
            </div>
            <Header as="h4">{state.playListDescription}</Header>
          </div>
          <div className="add_action">
            <Dropdown
              icon={null}
              trigger={
                <Popup
                  basic
                  className="popup_style"
                  content="Agregar/Editar playlist"
                  position="top right"
                  trigger={
                    <Button
                      className="custom_icon_button"
                      circular
                      color="black"
                      icon="ellipsis horizontal"
                    />
                  }
                />
              }
              direction="left"
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOpen} text="Editar" />
                <Dropdown.Item onClick={setShowDelete.bind(null, true)} text="Eliminar" />
                <Dropdown.Item onClick={() => {}} text="Añadir" />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Confirm
          open={showDelete}
          cancelButton='Cancelar'
          confirmButton="Aceptar"
          size="mini"
          
          content='Estas seguro de eliminar la list?'
          onCancel={setShowDelete.bind(null, false)}
          onConfirm={handleConfirm}
        />

        <div className='tabla tabla-playlist'>
          {hayCanciones ? (
            <Table inverted className='lista-canciones' >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Titulo</Table.HeaderCell>
                  <Table.HeaderCell>Duración</Table.HeaderCell>
                  <Table.HeaderCell>Fecha de agregado</Table.HeaderCell>
                  <Table.HeaderCell>Eliminar</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {canciones.map((cancion, i) => (
                  <Table.Row onClick={() => { onClick(cancion.song) }} key={i}>
                   
                    <Table.Cell>
                      {i + 1}
                    </Table.Cell>

                    <Table.Cell onClick={(ev) => {
                      ev.stopPropagation();
                      onPlay(cancion.song)
                      }}>
                      <Icon size='large' name='play circle outline' />
                    </Table.Cell>

                    <Table.Cell>
                      <img src={cancion.song.thumbnail.thumbnailUrl} className='miniatura'></img>
                    </Table.Cell>

                    <Table.Cell>
                      {cancion.song.songTitle}
                    </Table.Cell>

                    <Table.Cell>
                      {cancion.song.songDuration}
                    </Table.Cell>

                    <Table.Cell>
                      {cancion.registrationDate.split(" ")[0]}
                    </Table.Cell>

                    <Table.Cell>

                      <Button size="huge" icon="trash" onClick={(ev) => {
                        ev.stopPropagation();
                        setCancionEliminar(cancion);

                      }}>
                        {/* <Icon size="large" name="trash" ></Icon> */}
                      </Button>
                      
                    </Table.Cell>

                  </Table.Row>
                )
                )
                }
              </Table.Body>
            </Table>

          ) : (
            <><p className='noCanciones'>No se encontraron canciones</p></>
          )
          }

        </div>

      </div >
      {open && <PlayListForm {...{ setOpen, setState, state }} />
      }
      {modalEliminar}
    </>
  );
}
