import React, { useState } from 'react'
import { Search , Modal} from 'semantic-ui-react'

function SearchBar({busquedaResults,setBusquedaResults,setBusquedaCanciones,canciones}){
    const [entradaBuscador, setEntradaBuscador] = useState('');
    // const [searchHistory, setSearchHistory] = useState([]);
    let listaArtistas,listaCanciones;

    const getArtistas = () => {
        fetch('https://espotify.azurewebsites.net/artist')
          .then((res) => res.json())
          .then((json) => {
            const objetoStringJson = JSON.stringify(json);
            sessionStorage.setItem('jsonArtistas', objetoStringJson);
          })
          .catch((err) => {
            console.log(`Error message: ${err}`);
          });
    };

    const getCanciones = () => {
        fetch('https://espotify.azurewebsites.net/song')
          .then((res) => res.json())
          .then((json) => {
            const objetoStringJson = JSON.stringify(json);
            sessionStorage.setItem('jsonCanciones', objetoStringJson);
          })
          .catch((err) => {
            console.log(`Error message: ${err}`);
          });
    };

    listaArtistas = JSON.parse(sessionStorage.getItem('jsonArtistas'));
    listaCanciones = JSON.parse(sessionStorage.getItem('jsonCanciones'));

    const buscarResultados = (value) => {
        if(!sessionStorage.getItem('jsonArtistas') && !sessionStorage.getItem('jsonCanciones')){
            getArtistas();
            getCanciones();
        }else{    
            const resultsSet = new Set();
            try {
            listaArtistas.forEach((artista) => {
                if (artista && artista.artistName && artista.artistName.toLowerCase().includes(value.toLowerCase())) {
                    resultsSet.add({ title: artista.artistName, description: 'Artista' });
                }
                });
            listaCanciones.forEach((song) => {
                if (song && song.songTitle && song.songTitle.toLowerCase().includes(value.toLowerCase())) {
                    resultsSet.add({ title: song.songTitle, description: 'Cancion' });
                }
                });
        
            const res = [...resultsSet];
            setBusquedaResults(res);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const mostrarCanciones = (nombreArtista) => {
        const result = canciones.filter((cancion) => {
            return cancion.artista === nombreArtista;

        });
        
        setBusquedaCanciones(result);
    };

    const handleChange = (value) => {
        setEntradaBuscador(value);
        buscarResultados(value);
        if(value === ""){
            setBusquedaCanciones(canciones);
        }
    };

    const selectecResult = (data) => {
        if (data && data.title) {
            const selectedArtistName = data.title;
            mostrarCanciones(data.title);
            handleChange(selectedArtistName);
        }
        // else if(data && data.songTitle){
        //     const selectedSongTitle = data.songTitle;
        //     handleChange(selectedSongTitle);
        // }
        // setSearchHistory([...searchHistory, entradaBuscador]);
    };

    return (
        <div>
            <Search
                input={{ icon: 'search', iconPosition: 'left' }}
                value={entradaBuscador}
                onSearchChange={(e) => handleChange(e.target.value)}
                results={busquedaResults}
                onResultSelect={(e, { result }) => selectecResult(result)}
                placeholder='¿Que es lo que quieres escuchar?'
                showNoResults={false}
                className='search-bar'
            />
        </div>
    );
}

export default SearchBar;