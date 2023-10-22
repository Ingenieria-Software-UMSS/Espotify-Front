import React from 'react';
import './Informacion.css';
import { Button } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { Modal } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

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
const DropdownListaReproduccion  = () => {
    const [modalAgregadoOpen, setModalAgregadoOpen] = React.useState(false);
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
            <ModalAgregadoExito open={modalAgregadoOpen} onClose={() => {
                setModalAgregadoOpen(false);
            }} />
        </>
    );
}

const ModalAgregadoExito = (props) => {

    return (
        <Modal
            onClose={props.onClose}
            open={props.open}
            content='Elemento agregado exitosamente.'
            actions={[{ key: 'done', content: 'Aceptar', positive: true }]}
        />
    )
}


export default Informacion;
