import React, { useEffect, useState } from 'react';
import './Informacion.css';
import { Button } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';
import { Link, json, useLocation, useNavigate } from 'react-router-dom';

import iconoCancion from '../images/iconoCancion.png';

const Informacion = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id') || 'Unknown ID';
    const title = queryParams.get('title') || 'Unknown Title';
    const artist = queryParams.get('artist') || 'Unknown Artist';
    const duration = queryParams.get('duration') || 'Unknown Duration';
    const description = queryParams.get('description') || 'No description available.';
    const imageUrl = queryParams.get('image');

    return (
        <div className='informacion'>
            <div className='boton-contenedor-regresar'>
                <Link to='/home'>
                    <Button circular icon='left chevron' className='boton-regresar' />
                </Link>
            </div>
            <div className='contenido'>
                <div className='imagen-botones-contenedor'>
                    <div className='imagen-contenedor'>
                        <img src={imageUrl || iconoCancion} alt='Portada de la canción' className='imagen-cancion' />
                    </div>
                    <div className='boton-anadirlista'>
                        <DropdownListaReproduccion songId={id} />
                    </div>
                </div>
                <div className='detalles-cancion'>
                    <h1>{title}</h1>
                    <h2>{artist}</h2>
                    <p>{duration}</p>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
const DropdownListaReproduccion = (props) => {
    const [modalAgregadoOpen, setModalAgregadoOpen] = React.useState(false);
    const [modalRepetidoOpen, setModalRepetidoOpen] = React.useState(false);
    const [nombreLista, setNombreLista] = React.useState("");
    const [listas, setListas] = React.useState([]);

    React.useEffect(() => {
        const token = localStorage.getItem('auth_token');
        console.log(token);

        fetch('https://espotify.azurewebsites.net/play-list', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                console.log("status", response.status, response.statusText)
                return response.json();
            })
            .then(data => {
                setListas(data);
            })
            .catch(error => {
                console.error('Hubo un error:', error);
            });
    }, []);

    const navigate = useNavigate();
    const [idLista, setIdLista] = React.useState(null);

    const anadirPlayList = (playListId) => {
        // return fetch("http://localhost:8080/play-list-song", {
        const token = localStorage.getItem('auth_token');

        return fetch("https://espotify.azurewebsites.net/play-list-song", {

            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin

            headers: {
                'Authorization': `Bearer ${token}`,

                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playList: {
                    playListId: parseInt(playListId)
                },
                song: {
                    songId: parseInt(props.songId)
                }
            }),
        })
    };

    return (
        <>
            {
                <Dropdown icon='plus big circle' upward>
                    <Dropdown.Menu className='dropdownmenu'>
                        <Dropdown.Header content='Listas exitentes' />
                        <Dropdown.Divider />
                        {
                            listas.map((listaExistente) => {
                                return (
                                    <Dropdown.Item
                                        key={listaExistente.playListId}
                                        text={listaExistente.playListName}
                                        className='dropdownItem'
                                        direction='up'
                                        onClick={() => {
                                            console.log("listas existentes", listaExistente);
                                            console.log("listas", listas);

                                            // comprobar si ya existe en la playlist
                                            const playListSongList = listaExistente.playListSongList;
                                            let ocurrencias = 0;
                                            for (let i = 0; i < playListSongList.length; i++) {

                                                if (playListSongList[i].song.songId === parseInt(props.songId)) {
                                                    ocurrencias++;
                                                }
                                            }
                                            if (ocurrencias === 0) {
                                                //añade

                                                anadirPlayList(listaExistente.playListId).then((res) => {
                                                    if (res.ok) {
                                                        setModalAgregadoOpen(true);
                                                        setIdLista(listaExistente.playListId);
                                                    } else {
                                                        console.log(idLista, "else");
                                                    }
                                                })


                                            }
                                            if (ocurrencias === 1) {
                                                //modal
                                                setModalRepetidoOpen(true);
                                                setIdLista(listaExistente.playListId);
                                                setNombreLista(listaExistente.playListName);
                                            }
                                            
                                            if (ocurrencias >= 2) {
                                                alert("elemento  existente")
                                            }
                                        }}
                                    />
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            }
            <ModalAgregadoExito
                open={modalAgregadoOpen}
                onClose={() => {
                    setModalAgregadoOpen(false);
                }}
                onAccept={() => {
                    setModalAgregadoOpen(false);
                    const url = `/playlist/${idLista}`;
                    navigate(url);
                }}>
            </ModalAgregadoExito>

            <ModalAgregadoRepetido
                open={modalRepetidoOpen}
                nombreLista={nombreLista}
                onClose={() => {
                    setModalRepetidoOpen(false);
                }}
                onAgregarDTM={() => {
                    anadirPlayList(idLista).then((res) => {
                        if (res.ok) {
                            setModalAgregadoOpen(true);
                        } else {
                            console.log(idLista, "else");
                        }
                    })
                }}
            />
        </>
    );
}

const ModalAgregadoExito = (props) => {
    return (
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
                size='tiny'
            >
                <Modal.Content className='modalExito_contenido'>
                    <div className='mensaje'>
                        <h1>Elemento agregado exitosamente.</h1>
                    </div>
                    <Button onClick={props.onAccept} className='modal_botonAceptar' color='black'>
                        Aceptar
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

const ModalAgregadoRepetido = (props) => {

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
                size='small'
            >
                <Modal.Content className='modalRepetido_contenido'>
                    <div className='mensaje'>
                        <h1>El elemento ya está agregado en la playlist "{props.nombreLista}".</h1>
                    </div>
                    <div className='contenedor_botones_ADTM' >
                        <Button onClick={props.onAgregarDTM} className='modal_botonAgregarDTM' color='gray' >
                            Agregar de todos modos
                        </Button>
                        <Button onClick={props.onClose} className='modal_botonNoAgregar' color='black'>
                            No agregar
                        </Button>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}


export default Informacion;
