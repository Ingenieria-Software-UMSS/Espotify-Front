import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Popup, Select, Table, Form, Input, TextArea } from 'semantic-ui-react';
import './ListaSubidos.css';

const ListaSubidos = () => {
    const [openSubirCancion, setOpenSubirCancion] = useState(false); //abrir/cerrar modal subir cancion
    const [openEditarCancion, setOpenEditarCancion] = useState(false); //abrir/cerrar modal subir cancion
    const [openBorrarCancion, setOpenBorrarCancion] = useState(false); //borrar modal subir cancion
    const [datosFormulario, setDatosFormulario] = useState({
        titulo: '',
        artista: '',
        genero: '',
        cancion: null,
        letra: null,
        imagen: null
    });

    const generos = [
        { key: 'df', value: 'df', text: 'Seleccione un genero..' },
        { key: 'cm', value: 'cb', text: 'Cumbia' },
        { key: 'rk', value: 'rk', text: 'Rock' },
        { key: 'pp', value: 'pp', text: 'Pop' },
    ]
    //Subir cancion
    const handleOpenSubirCancion = () => {
        setOpenSubirCancion(true);
    };

    const handleCloseSubirCancion = () => {
        setOpenSubirCancion(false);
    };
    //Editar cancion
    const handleOpenEditarCancion = () => {
        setOpenEditarCancion(true);
    };

    const handleCloseEditarCancion = () => {
        setOpenEditarCancion(false);
    };
    //Borrar cancion
    const handleOpenBorrarModal = () => {
        setOpenBorrarCancion(true);
    };

    const handleCerrarBorrarModal = () => {
        setOpenBorrarCancion(false);
    };
    //Datos formulario
    const handleDatosFormulario = () => {
        alert('holi');
    };


    return (
        <div className='contenedor-lista' style={{ color: '#fff' }}>
            <div className='container-lista-baner'>
                <Header as='h1'>Lista de canciones subidas</Header>
                <div className='container-botones'>
                    <div className='contenedor-icono-subir'>
                        <Popup className='icono-subir' content='Subir cancion' trigger={<Icon onClick={handleOpenSubirCancion} size='big' name='cloud upload' />} />
                    </div>
                    <div className='contenedor-icono-subir'>
                        <Popup className='icono-subir' content='Editar' trigger={<Icon onClick={handleOpenEditarCancion} size='big' name='edit' />} />
                    </div>
                    <div className='contenedor-icono-subir'>
                        <Popup className='icono-subir' content='Borrar' trigger={<Icon onClick={handleOpenBorrarModal} size='big' name='trash' />} />
                    </div>
                </div>
            </div>
            <div className='contenedor-lista-canciones-subidas'>
                <Table inverted className='lista-canciones' >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Acción</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Título</Table.HeaderCell>
                            <Table.HeaderCell>Artista</Table.HeaderCell>
                            <Table.HeaderCell>Duración</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>
            </div>
            {/* Subir cancion */}
            <Modal
                onClose={handleCloseSubirCancion}
                onOpen={handleOpenSubirCancion}
                open={openSubirCancion}
                className="modal-subir-cancion"
            >
                <Modal.Content className='formulario-modal-subir-cancion'>
                    <div className="form-container">
                        <h1>Subir nueva canción</h1>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Titulo</label>
                                <input type="text" placeholder='Ingrese el nombre de la cancion' />
                            </div>
                            <div className="form-group">
                                <label>Artista</label>
                                <input type='text' placeholder='Ingrese el nombre del artista' />
                            </div>
                            <div className="form-group">
                                <label>Genero</label>
                                <Select options={generos} />
                            </div>
                        </div>
                        <div className="form-row">

                            <div className="form-group">
                                <label>Archivo Cancion</label>
                                <input type="file" accept=".mp3" onChange={handleDatosFormulario} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Letra</label>
                                <input type="file" accept=".txt" onChange={handleDatosFormulario} />
                            </div>
                            <div className="form-group">
                                <label>Imagen</label>
                                <input type="file" accept=".png" onChange={handleDatosFormulario} />
                            </div>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleCloseSubirCancion}>
                        Cerrar
                    </Button>
                    <Button
                        color='green'
                        content='Subir'
                        onClick={handleCloseSubirCancion} // Agregar función para guardar la canción
                    />
                </Modal.Actions>
            </Modal>
            {/* editar */}
            {/* <Modal
                onClose={handleCloseEditarCancion}
                onOpen={handleOpenEditarCancion}
                open={openEditarCancion}
                className="modal-editar-cancion"
            >
                <Modal.Content className='formulario-modal-editar-cancion'>
                    <div className="form-container">
                        <h1>Editar informacion de cancion</h1>
                        <div>
                            <Form className="playlist_form">
                                <div className="form_image">
                                    <img width={200} alt="paylist_logo" />
                                    <label className="custom_input">
                                        <Icon name="edit" size="big" />
                                        <input type="file" />
                                    </label>
                                </div>
                                <div className="form_labels">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Titulo</label>
                                            <input type="text" placeholder='-nombre de la cancion-' />
                                        </div>
                                        <div className="form-group">
                                            <label>Artista</label>
                                            <input type='text' placeholder='-nombre de artista-' />
                                        </div>
                                        <div className="form-group">
                                            <label>Genero</label>
                                            <Select options={generos} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Letra</label>
                                            <input type="file" accept=".txt" onChange={handleDatosFormulario} />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>

                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleCloseEditarCancion}>
                        Cerrar
                    </Button>
                    <Button
                        color='green'
                        content='Subir'
                        onClick={handleCloseEditarCancion} // Agregar función para guardar la canción
                    />
                </Modal.Actions>
            </Modal> */}
            <Modal
                onClose={handleCloseEditarCancion}
                onOpen={handleOpenEditarCancion}
                open={openEditarCancion}
                className="modal-editar-cancion"
            >
                <Modal.Content className='formulario-modal-editar-cancion'>
                    <div className="form-container">
                        <h1>Editar Información de la Canción</h1>
                        <div>
                            <Form className="playlist-form">
                                <div className="form-image">
                                    <img src={"../images/iconoCancion.jpg"} width={200} alt="Logo de la Lista de Reproducción" />
                                    <label className="custom-input">
                                        <Icon name="edit" size="big" />
                                        <input type="file" />
                                    </label>
                                </div>
                                <div className="form-labels">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Título</label>
                                            <input type="text" placeholder='Nombre de la Canción' />
                                        </div>
                                        <div className="form-group">
                                            <label>Artista</label>
                                            <input type='text' placeholder='Nombre del Artista' />
                                        </div>
                                        <div className="form-group">
                                            <label>Género</label>
                                            <Select options={generos} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Letra</label>
                                            <input type="file" accept=".txt" onChange={handleDatosFormulario} />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleCloseEditarCancion}>
                        Cerrar
                    </Button>
                    <Button
                        color='green'
                        content='Guardar'
                       /*  onClick={handleSaveEditedSong} */
                    />
                </Modal.Actions>
            </Modal>

            {/*Borrar  */}
            <Modal
                onOpen={handleOpenBorrarModal}
                onClose={handleCerrarBorrarModal}
                open={openBorrarCancion}
                className="modal-subir-cancion"
                size='tiny'
            >
                <Header style={{ fontSize: '25px' }}>Borrar cancion</Header>
                <Modal.Content className='formulario-modal-subir-cancion'>
                    <p style={{ color: 'black', fontSize: '20px' }}>¿Esta seguro de borrar la cancion?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={handleCerrarBorrarModal}>
                        Cerrar
                    </Button>
                    <Button
                        color='red'
                        content='Borrar'
                        onClick={handleCerrarBorrarModal} // Agregar función para guardar la canción
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
};

export default ListaSubidos;