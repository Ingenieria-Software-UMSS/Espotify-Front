import React, {Fragment, useEffect, useState} from 'react';
import {Cancion} from "../api/Cancion";
import "./Home.css";
import ListaCanciones from '../components/ListaCanciones';
import CampoBusqueda from '../components/CampoBusqueda';
import {getSongList} from "../api/services/songService";
import { Button } from 'semantic-ui-react';

const cancionController = new Cancion();

export default function Home() {
    const [canciones, setCanciones] = useState([]);
    const [busquedaResults, setBusquedaResults] = useState([]);
    const [busquedaCanciones, setBusquedaCanciones] = useState([]);
    useEffect(() =>{
      (async () => {
        try {
          const response = await cancionController.obtenerTodas();
          setCanciones(response);
          setBusquedaCanciones(response);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      })();
    },[]);

    return (
      <Fragment>
        <div>
          <CampoBusqueda
            busquedaResults={busquedaResults}
            setBusquedaResults={setBusquedaResults}
            setBusquedaCanciones={setBusquedaCanciones}
            canciones={canciones}
          />
        </div>
        <div className='canciones'>

          <h1>Lista de canciones</h1>
          <ListaCanciones canciones={busquedaCanciones}/>
        </div>
      </Fragment>
    )
  }
