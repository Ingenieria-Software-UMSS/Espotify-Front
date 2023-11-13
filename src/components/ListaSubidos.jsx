import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Popup, Select, Table, Form, Input, TextArea } from 'semantic-ui-react';
import './ListaSubidos.css';
import { UsarPlayer } from '../hooks/UsarPlayer';
import './ListaCanciones.css'
import './ResultadoBusqueda.css';

const ListaSubidos = () => {
    const [openSubirCancion, setOpenSubirCancion] = useState(false); //abrir/cerrar modal subir cancion
    const [openEditarCancion, setOpenEditarCancion] = useState(false); //abrir/cerrar modal subir cancion
    const [openBorrarCancion, setOpenBorrarCancion] = useState(false); //borrar modal subir cancion
    
    const [editedImage, setEditedImage] = useState(null);

    const { playCancion, play } = UsarPlayer();
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
    const canciones = ([
        {
            album: "Seeger",
            artista: "John Deley and the 41 Players",
            duracion: "03:57",
            id: 3,
            nombre: "Seeger",
            urlCancion: "http://espotify.azurewebsites.net/storage/audio/652f253ba0032128694c0a68",
            urlImagen: "http://espotify.azurewebsites.net/storage/image/652f2401a0032128694c0a67",
            registrationDate: "2023-10-18 00:22:29"

        }
    ]);

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


    const onClick = (i) => () => {
        const song = canciones[i];
        const description = `Disfruta de '${song.nombre}', interpretada por ${song.artista}.
        Una canción que te atrapará con su ritmo y letras.
        ¡Reproduce y déjate llevar durante ${song.duracion} minutos de pura magia musical!`;
        const url = `/cancion?title=${encodeURIComponent(song.nombre)}&artist=${encodeURIComponent(song.artista)}&duration=${encodeURIComponent(song.duracion)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(song.urlImagen)}`;
        // navigate(url);
    }

    const onPlay = (item) => {
        playCancion(item);
    }
    
    return (
        <div className='contenedor-lista' style={{ color: '#fff' }}>
            <div className='container-lista-baner'>
                <Header as='h1'>Lista de canciones subidas</Header>
                <div className='container-botones'>
                    <div className='contenedor-icono-subir'>
                        <Popup className='icono-subir' content='Subir cancion' trigger={<Icon onClick={handleOpenSubirCancion} size='big' name='cloud upload' />} />
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
                            <Table.HeaderCell>Fecha Agregado</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {[...canciones].map((cancion, i) => (
                            <Table.Row onClick={onClick(i)} key={i}>
                                <Table.Cell>
                                    {i + 1}
                                </Table.Cell>
                                <Table.Cell onClick={(ev) => {
                                    ev.stopPropagation();
                                    onPlay(cancion)
                                }}>
                                    <Icon size='large' name='play circle outline' />
                                </Table.Cell>
                                <Table.Cell>
                                    <img src={cancion.urlImagen} className='miniatura' alt=''></img>
                                </Table.Cell>
                                <Table.Cell>
                                    {cancion.nombre}
                                </Table.Cell>
                                <Table.Cell>
                                    {cancion.artista}
                                </Table.Cell>
                                <Table.Cell>
                                    {cancion.duracion}
                                </Table.Cell>
                                <Table.Cell>
                                    {cancion.registrationDate.split(" ")[0]}
                                </Table.Cell>

                                <Table.Cell>
                                    <Popup className='icono-subir' content='Editar' trigger={<Icon onClick={handleOpenEditarCancion} size='big' name='edit' />} />
                                    <Popup className='icono-subir' content='Borrar' trigger={<Icon onClick={handleOpenBorrarModal} size='big' name='trash' />} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
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
                                <label>Genero </label>
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

            {/* editar */}
            <Modal
                onClose={handleCloseEditarCancion}
                onOpen={handleOpenEditarCancion}
                open={openEditarCancion}
                className="modal-editar-cancion"
            >
                <Modal.Content className='formulario-modal-editar-cancion'>
                    <div className="form-container-editar">
                        <h1>Editar Información de la Canción</h1>
                        <div className='contenedor-formulario'>
                            <Form className="playlist-form-editar" >

                                <div className="form-labels">
                                    <div className="form-row">

                                        <div className="form-group">

                                            <label>Título</label>
                                            <input type="text" placeholder='Nombre de la Canción' />
                                        </div>

                                        <div className="form-group">
                                            <label>Artista
                                                <input type='text' placeholder='Nombre del Artista' className="small-input" />
                                            </label>

                                        </div>

                                        <div className="form-group">
                                            <label>Género</label>
                                            <Select options={generos} />
                                        </div>


                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Letra</label>
                                                <input type="file" accept=".txt" onChange={handleDatosFormulario} />
                                            </div>

                                        </div>


                                    </div>

                                    <div className='form-group'>
                                        <div className='imagen-contenedor'>
                                            <img className="imagen" src={editedImage?.objectUrl ?? canciones[0].urlImagen} width={200} height={200} alt="Logo de la Lista de Reproducción" />
                                        </div>
                                        <label className="custom-input">
                                            {/* <Icon name="edit" size="big" /> */}
                                            <input type="file" accept='.png' onChange={(e) => {
                                                if (!e.target.files || e.target.files.length === 0) {
                                                    setEditedImage(null)
                                                    return
                                                }
                                                const file = e.target.files[0];
                                                const objectUrl = URL.createObjectURL(file);
                                                setEditedImage({objectUrl, file})
                                            }} />
                                        </label>
                                        {/* <div className="form_image" style={{width: 200, height: 200}}>
                                            <img width={200} src={canciones[0].urlImagen ?? imagenManga} alt="paylist_logo" />
                                            <label className="custom_input">
                                                <Icon name="edit" size="big" />
                                                <input onChange={onChangeImage} type="file" />
                                            </label>
                                        </div> */}

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
        </div >
    )
};

export default ListaSubidos;