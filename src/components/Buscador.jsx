import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import "./Buscador.css";

const Buscador = React.forwardRef((props, ref) => {
  const [inputText, setInputText] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [resultadosDeBusqueda, setResultadosDeBusqueda] = useState([]);
  const [historial, setHistorial] = React.useState(() => {
    const historialAlmacenado = localStorage.getItem('historial');
    return historialAlmacenado ? JSON.parse(historialAlmacenado) : [];
  });
  const [mostrarHistorial,setMostrarHistorial] = useState(false);
  const [listaCanciones, setListaCanciones] = useState([]);
  const [listaArtistas, setListaArtistas] = useState([]);
  const [id, setId] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  let url = "";
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref?.current && !ref.current.contains(event.target)) {
        setMostrarResultados(false);
        setMostrarHistorial(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
      localStorage.setItem('historial', JSON.stringify(historial));
  }, [historial]);

  React.useEffect(() => {
    fetch("https://espotify.azurewebsites.net/artist")
      .then((res) => res.json())
      .then((dataArtistas) => {
        setListaArtistas(dataArtistas);
      })
      .catch((err) => console.error(err));
  }, [setListaArtistas]);

  React.useEffect(() => {
    fetch("https://espotify.azurewebsites.net/song")
      .then((res) => res.json())
      .then((dataCanciones) => {
        setListaCanciones(dataCanciones);
      })
      .catch((err) => console.error(err));
  }, [setListaCanciones]);

  const buscarResults = (valor) => {
    let res = [];
    try {
      const valorLower = valor.toLowerCase();
  
      for (let i = 0; i < listaArtistas.length && res.length < 10; i++) {
        const artistNameLower = listaArtistas[i].artistName.toLowerCase();
        if (artistNameLower.startsWith(valorLower)) {
          setId(listaArtistas[i].artistId);
          setTipo('artista');
          res.push({
            title: listaArtistas[i].artistName,
            id: listaArtistas[i].artistId,
            tipo: "artista",
          });
        }
      }
  
      if (res.length === 0) {
        for (let i = 0; i < listaCanciones.length && res.length < 10; i++) {
          const songTitleLower = listaCanciones[i].songTitle.toLowerCase();
          if (songTitleLower.startsWith(valorLower)) {
            setId(listaCanciones[i].songId);
            setTipo('cancion');
            res.push({
              title: songTitleLower,
              id: listaCanciones[i].songId,
              tipo: "cancion",
            });
          }
        }
      }
      console.log('Res lista ', res);
      if (res.length === 0) {
        setId("-1");
        setTipo("none");
      }
  
      setResultadosDeBusqueda(res);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);

    if (value) {
      setMostrarHistorial(false);
      const sugerencia = buscarResults(value);
      setResultadosDeBusqueda(sugerencia);
      setMostrarResultados(true);
    } else {
      setMostrarHistorial(true);
      setResultadosDeBusqueda([]);
      setMostrarResultados(false);
    }
  };

  const handleResultClick = (result) => {
    url = `/results?search=${result.title}&id=${result.id}&tipo=${result.tipo}`;
    setInputText(result.title);
    setId(result.id);
    setTipo(result.tipo);
    setMostrarResultados(false);
    setMostrarHistorial(false);
    navigate(url);
    if (!historial.some((element) => element.title === result.title)) {
      setHistorial((prevHistorial) => [...prevHistorial, result]);
    } else {
      console.log('Ya existe', result.title);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputText === "") {
        url = `/results?search=${inputText}&id=${""}&tipo=${""}`;
      } else if(inputText.length === 1){
        url = `/results?search=${inputText}&id=${-2}&tipo=${-2}`;
      }else {
        url = `/results?search=${inputText}&id=${id}&tipo=${tipo}`;
        let element = buscarPorId(id);
        if(element !== null) {
          setHistorial((prevHistorial) => [...prevHistorial,element]);
        }
      }
      navigate(url);
      url = "";
      setMostrarResultados(false);
    }
  };

  const handleDeleteResult = (index) => {
    const nuevoHistorial = [...historial];
    nuevoHistorial.splice(index, 1);
    setHistorial(nuevoHistorial);
  };

  const handleDeleteAllHistory = () => {
    setHistorial([]);
  }

  const buscarPorId = (id) => {
    const artistaEncontrado = listaArtistas.find((element) => element.artistId === id);
    if (artistaEncontrado) {
      return {
        title: artistaEncontrado.artistName,
        id: artistaEncontrado.artistId,
        tipo: "artista",
      };
    }

    const cancionEncontrada = listaCanciones.find((element) => element.songId === id);
    if (cancionEncontrada) {
      return {
        title: artistaEncontrado.songTitle,
        id: artistaEncontrado.songId,
        tipo: "cancion",
      };
    }
    return null;
  };

  const handleInputFocus = () => {
    setMostrarResultados(true);
    if(inputText === ''){
      setMostrarHistorial(true);
    }
  };

  const handleInputBlur = () => {
    setMostrarResultados(false);
    setMostrarHistorial(false);
  };

  return (
    <div className="contenedor-buscador" >
      <div className="buscador">
        <Icon name="search" className="search-icon" />
        <input
          ref={ref}
          type="text"
          placeholder="¿Qué es lo que quieres buscar?"
          value={inputText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="campo-texto"
        />
      </div>
      {mostrarResultados && (
        <div className="search-results">
          {resultadosDeBusqueda.length > 0 ? (
            resultadosDeBusqueda.map((result, index) => (
              <div
                key={index}
                className="search-results-item"
                onClick={() => handleResultClick(result)}
              >
                <Icon name="search" className="search-icon" />
                {result.title}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      )}
      {mostrarHistorial && (
        <div className="search-results">
          {historial.length > 0 ? (
            <>
            {historial.map((result, index) => (
              <div
                key={index}
                className="search-results-item"
                onClick={() => handleResultClick(result)}
              >
                <Icon name="history" className="history-icon" />
                <div className="title-result">
                  {result.title}
                </div>
                <div className="trash-div">
                  <Icon name="trash" onClick={() => handleDeleteResult(index)} className="trash-icon" title="Eliminar" />
                </div>
                
              </div>
            ))}
            <div
              className="search-results-item"
              onClick={handleDeleteAllHistory}
            >
              {'Borrar historial de búsqueda'}
            </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
});

export default Buscador;
