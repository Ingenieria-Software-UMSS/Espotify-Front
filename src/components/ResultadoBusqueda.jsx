import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table, Icon} from 'semantic-ui-react';
import { UsarPlayer } from '../hooks/UsarPlayer';
import './ListaCanciones.css'
import './ResultadoBusqueda.css';

function ResultadoBusqueda(){
    const [canciones,setCanciones] = React.useState([]);
    const {playCancion, play} = UsarPlayer();
    const [isOnline,setIsOnline] = React.useState(true);
    const [listaVacia,setListaVacia] = React.useState(false);
    const [inicio,setInicio] = React.useState(false);

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const initialState = () => {
        setInicio(true);
        setCanciones([]);
    }

    React.useEffect(() => {
        try{
            const res = [];
            if(params.get('tipo') === 'cancion'){
                const id = params.get('id');
                // const url = `http://localhost:8080/song/${id}`; //Version pruebas
                // const url = `http://192.168.0.104:8080/song/${id}`;
                const url = `https://espotify.azurewebsites.net/song/${id}`;//Version deploy
                fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    res.push({
                        urlImagen: data.thumbnail.thumbnailUrl,
                        nombre: data.songTitle, 
                        artista: data.artist.artistName, 
                        duracion: data.songDuration ,
                        id: data.songId,
                        urlCancion: data.songUrl,
                        album: data.songAlbum 
                    });
                    setInicio(false);
                    setListaVacia(false);
                    setCanciones(res);
                })
                .catch((err) => console.error(err));
            }else if(params.get('tipo') === 'artista'){
                const id = params.get('id');
                // const url = `http://localhost:8080/artist/${id}`; //Version pruebas
                // const url = `http://192.168.0.104:8080/artist/${id}`; //Version pruebas
                const url = `https://espotify.azurewebsites.net/artist/${id}`;//Version deploy
                fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    for(let i = 0 ; i < data.songList.length ; i++){
                        res.push({
                            urlImagen: data.songList[i].thumbnail?.thumbnailUrl,
                            nombre: data.songList[i].songTitle, 
                            artista: data.artistName, 
                            duracion: data.songList[i].songDuration ,
                            id: data.songList[i].songId,
                            urlCancion: data.songList[i].songUrl,
                            album: data.songList[i].songAlbum 
                        });
                    }
                    setInicio(false);
                    setListaVacia(false);
                    setCanciones(res);
                })
                .catch((err) => console.error(err));
            }else if(params.get('tipo') === 'none' && params.get('id') === '-1'){
                setInicio(false);
                setListaVacia(true);
            }else if(params.get('tipo') === '' && params.get('id') === ''){
                initialState();
            }
        }catch(err){
            console.error(err);
        }
    },[params]);

    const onClick = (i) => () => {
        const song = canciones[i];
        const description = `Disfruta de '${song.nombre}', interpretada por ${song.artista}.
        Una canción que te atrapará con su ritmo y letras.
        ¡Reproduce y déjate llevar durante ${song.duracion} minutos de pura magia musical!`;
        const url = `/cancion?title=${encodeURIComponent(song.nombre)}&artist=${encodeURIComponent(song.artista)}&duration=${encodeURIComponent(song.duracion)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(song.urlImagen)}`;
        navigate(url);
    }

    const onPlay = (item) => {
        playCancion(item);
    }

    window.addEventListener('online', function () {
        setIsOnline(true);
    });

    window.addEventListener('offline', function () {
        setIsOnline(false);
    });
    return (
        <div id='contenedor-resultados'>
            <div className='tabla'>
                {
                    isOnline ? 
                            (
                                ( !inicio ? 
                                    !listaVacia ? (
                                        <div>
                                            <div>
                                                <h1 style={{color: 'white'}}>Resultados de busqueda</h1>
                                            </div>
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
                                                            </Table.Row>
                                                        ))}
                                                </Table.Body>
                                            </Table>
                                        </div>) : (<div className='message'>
                                            <Icon name='exclamation triangle' size='massive'/>
                                            <h2>No se ha encontrado ningun resultado. Intente nuevamente </h2>
                                        </div>)
                                    : <div className='message'>
                                        <Icon name='music' size='massive'/>
                                        <h1>¿Que es lo que quieres escuchar?</h1>
                                    </div>
                                )
                            )
                    : <div className='message'>
                        <Icon name='wifi' size='massive'/>
                        <h1 style={{color:'white'}}>Error de conexion. Por favor, verifica tu conexion e intenta nuevamente</h1>
                    </div>
                }
            </div>
        </div>
    );
}

export default ResultadoBusqueda;