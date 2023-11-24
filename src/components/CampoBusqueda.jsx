import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'semantic-ui-react'
import "./CampoBusqueda.css"

import borrarIcono from '../images/borrar-icono.png';

const CampoBusqueda = React.forwardRef(function ({busquedaResults,setBusquedaResults}, ref){
    const [entradaBuscador, setEntradaBuscador] = React.useState('');
    const [listaArtistas,setListaArtistas] = React.useState([]);
    const [listaCanciones,setListaCanciones] = React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const [enterDown,setEnterDown] = React.useState(false);
    // const [mostrarHistorial, setMostrarHistorial] = React.useState(false);
    const [historial, setHistorial] = React.useState(() => {
        const historialAlmacenado = localStorage.getItem('historial');
        return historialAlmacenado ? JSON.parse(historialAlmacenado) : [];
    });
    
    const [id,setId] = React.useState('');
    const [tipo,setTipo] = React.useState('');

    const navigate = useNavigate();

    React.useEffect(() => {
        fetch('https://espotify.azurewebsites.net/artist') //Version deploy
        // fetch('http://192.168.0.104:8080/artist')
        // fetch('http://localhost:8080/artist') //Version de prueba
        .then((res) => res.json())
        .then((dataArtistas) => {
            setListaArtistas(dataArtistas)
        })
        .catch((err) => console.error(err));

        fetch('https://espotify.azurewebsites.net/song') //Version deploy
        // fetch('http://192.168.0.104:8080/song')
        // fetch('http://localhost:8080/song') //Version de prueba
        .then((res) => res.json())
        .then((dataCanciones) => {
            setListaCanciones(dataCanciones)
        })
        .catch((err) => console.error(err));
    },[setListaArtistas,setListaCanciones]);

    React.useEffect(() => {
        localStorage.setItem('historial', JSON.stringify(historial));
      }, [historial]);

    const buscarResults = (valor) => {
        setLoading(true);
        let res = [];
        for (let i = 0; i < listaArtistas.length && res.length < 10; i++) {
            if(listaArtistas[i].artistName.toLowerCase().includes(valor.toLowerCase())){
                setId(listaArtistas[i].artistId);
                setTipo('artista');
                res.push({title: listaArtistas[i].artistName, description: 'Artista'});
            }
        }
        if(res.length === 0){
            for (let i = 0; i < listaCanciones.length && res.length < 10 ; i++) {
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
        setEntradaBuscador(value);
        if(entradaBuscador === ''){
            // setMostrarHistorial(true);
			setBusquedaResults(historial);
        }else{
            buscarResults(value);
        }
    };

    const selectecResult = (data) => {
        if (data && data.title) {
            const selectedItem = data.title;
			let flag = false;
			for(let i = 0 ; i < historial.length && !flag ; i++){
				if(historial[i].title === selectedItem){
					flag = true;
				}
			}
			if(!flag){
				console.log(borrarIcono)
				setHistorial((prevHistorial) => [...prevHistorial, {title: selectedItem, image: borrarIcono}])
			}
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