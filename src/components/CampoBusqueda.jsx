import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'semantic-ui-react'
import "./CampoBusqueda.css"

const CampoBusqueda = React.forwardRef(function ({busquedaResults,setBusquedaResults}, ref){
    const [entradaBuscador, setEntradaBuscador] = React.useState('');
    const [listaArtistas,setListaArtistas] = React.useState([]);
    const [listaCanciones,setListaCanciones] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [enterDown,setEnterDown] = React.useState(false);
    
    const [id,setId] = React.useState('');
    const [tipo,setTipo] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        fetch('https://espotify.azurewebsites.net/artist') //Version deploy
        // fetch('http://localhost:8080/artist') //Version de prueba
        .then((res) => res.json())
        .then((dataArtistas) => {
            setListaArtistas(dataArtistas)
        })
        .catch((err) => console.error(err));

        fetch('https://espotify.azurewebsites.net/song') //Version deploy
        // fetch('http://localhost:8080/song') //Version de prueba
        .then((res) => res.json())
        .then((dataCanciones) => {
            setListaCanciones(dataCanciones)
        })
        .catch((err) => console.error(err));
    },[setListaArtistas,setListaCanciones]);

    const buscarResults = (valor) => {
        let res = [];
        for (let i = 0; i < listaArtistas.length; i++) {
            // if(valor.toLowerCase() === listaArtistas[i].artistName.toLowerCase()){
            if(listaArtistas[i].artistName.toLowerCase().includes(valor.toLowerCase())){
                setId(listaArtistas[i].artistId);
                setTipo('artista');
                res.push({title: listaArtistas[i].artistName, description: 'Artista'});
            }
        }
        if(res.length === 0){
            for (let i = 0; i < listaCanciones.length; i++) {
                // if(valor.toLowerCase() === listaCanciones[i].songTitle.toLowerCase()){
                // if(listaCanciones[i].songTitle.toLowerCase().includes(valor.toLowerCase())){
                //     setId(listaCanciones[i].songId);
                //     setTipo('cancion');
                //     res.push({title: listaCanciones[i].songTitle, description: 'Cancion'});
                // }
                const songTitle = listaCanciones[i].songTitle.toLowerCase();
                if (songTitle.includes(valor.toLowerCase()) && !res.some(item => item.title === songTitle)) {
                    setId(listaCanciones[i].songId);
                    setTipo('cancion');
                    res.push({ title: songTitle, description: 'Cancion' });
                }
            }
        }
        if(res.length === 0) {
            setId('-1');
            setTipo('none')
        }
        setBusquedaResults(res);
        setLoading(false);
        return res;
    };

    const handleChange = (value) => {
        setLoading(!loading);
        setEntradaBuscador(value);
        buscarResults(value);
    };

    const selectecResult = (data) => {
        if (data && data.title) {
            const selectedItem = data.title;
            handleChange(selectedItem);
        }
    };

    const keyDown = (e) => {
        if (e.key === 'Enter') {
            setEnterDown(true);
            let url = `/results?search=${entradaBuscador}&id=${id}&tipo=${tipo}`;
            if(entradaBuscador === ''){
                url =`/results?search=${entradaBuscador}&id=${''}&tipo=${''}`;
            }
            navigate(url);
        }
    };

    return (
        <div style={{ flexGrow: 1}}>
            <Search
                input={{ icon: 'search', iconPosition: 'left', ref }}
                value={entradaBuscador}
                onSearchChange={(e) => handleChange(e.target.value)}
                results={busquedaResults}
                onResultSelect={(e, { result }) => selectecResult(result)}
                placeholder="¿Que es lo que quieres escuchar?"
                showNoResults={false}
                onKeyDown={keyDown}
                loading={loading}
                selectFirstResult={enterDown}
            />
        </div>
    );
});

export default CampoBusqueda;