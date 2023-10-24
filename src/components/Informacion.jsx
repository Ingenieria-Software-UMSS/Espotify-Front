import React from 'react';
import './Informacion.css';
import { Button } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';
import { Link, json, useLocation, useNavigate } from 'react-router-dom';

import iconoCancion from '../images/iconoCancion.png';

const Informacion = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const title = queryParams.get('title') || 'Unknown Title';
    const artist = queryParams.get('artist') || 'Unknown Artist';
    const duration = queryParams.get('duration') || 'Unknown Duration';
    const description = queryParams.get('description') || 'No description available.';
    const imageUrl = queryParams.get('image');

    return (
        <div className='informacion'>
            <div className='boton-contenedor'>
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
                        <DropdownListaReproduccion />
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
const DropdownListaReproduccion = () => {
    const [modalAgregadoOpen, setModalAgregadoOpen] = React.useState(false);
    // const listas = fetch("https://espotify.azurewebsites.net/play-list")
    //     .then((res) => res.json())
    //     .then((json) => {
    //         console.log(json[0].playListName);
    //         return json
    //     })

    const [listasExistentes, setListasExistentes] = React.useState([
        {
            id: 1,
            nombre: 'Lista 1'
        },
        {
            id: 2,
            nombre: 'Lista 2'
        },
        {
            id: 3,
            nombre: 'Lista 3'
        }
    ]);
    const hayListas = listasExistentes.length > 0;
    const navigate = useNavigate();

    return (
        <>
            {
                hayListas && (
                    <Dropdown simple icon='plus'>
                        <Dropdown.Menu className='dropdownmenu'>
                            <Dropdown.Header content='Listas exitentes' />
                            <Dropdown.Divider />
                            {
                                listasExistentes.map((listaExistente) => {
                                    return (
                                        <Dropdown.Item key={listaExistente.id} text={listaExistente.nombre} onClick={() => {
                                            console.log('Guardando Lista', listaExistente);
                                            setModalAgregadoOpen(true);
                                        }} />
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>)
            }
            <ModalAgregadoExito
                open={modalAgregadoOpen} onClose={() => {
                    setModalAgregadoOpen(false);
                    const url = "/playlist";
                    navigate(url);
                }}>
            </ModalAgregadoExito>
        </>
    );
}

const ModalAgregadoExito = (props) => {
    const [modalAgregadoOpen, setModalAgregadoOpen] = React.useState(false);

    return (
        <>
            <Modal
                open={props.open}
            >
                <Modal.Content className='modalExito_contenido'>
                    <div className='mensaje'>
                        <h1>Elemento agregado exitosamente.</h1>
                    </div>
                    <Button onClick={props.onClose} className='modal_botonAceptar' color='black'>
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
            >
                <Modal.Content className='modalRepetido_contenido'>
                    <div className='mensaje'>
                        <h1>El elemento ya agregado en la play "nombre de lista".</h1>
                    </div>
                    <Button onClick={props.onClose} className='modal_botonAgregarDTM' color='gray' >
                        Agregar de todos modos
                    </Button>
                    <Button onClick={props.onClose} className='modal_botonNoAgregar' color='black'>
                        No agregar
                    </Button>
                </Modal.Content>
            </Modal>
        </>
    )
}

const ModalEliminar = (props) => {
    return (
        <>
            <Modal
                open={props.open}
            >
                <Modal.Content className='modalEliminar_contenedor'>
                    <div className='mensaje'>
                        <h1>¿Estas seguro que deseas eliminar?</h1>
                    </div>
                    <Button onClick={props.onClose} className='modal_botonAceptar' color='red'>Aceptar</Button>
                    <Button onClick={props.onClose} className='modal_botonCancelar' color='black'>Cancelar</Button>

                </Modal.Content>
            </Modal>
        </>
    )
}


export default Informacion;
