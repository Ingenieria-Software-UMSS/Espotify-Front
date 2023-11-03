import React, {Fragment, useEffect} from 'react';
import {Cancion} from "../api/Cancion";
import "./Home.css";
import ListaCanciones from '../components/ListaCanciones';

const cancionController = new Cancion();

export default function Home () {
  const [canciones, setCanciones] = React.useState([]);

    useEffect(() =>{
      (async () => {
        try {
          const response = await cancionController.obtenerTodas();
          setCanciones(response);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      })();
    },[]);

    return (
      <Fragment>
        <div>
          
        </div>
        <div className='canciones'>

          <h1>Lista de canciones</h1>
          <ListaCanciones canciones={canciones}/>
        </div>
      </Fragment>
    )
  }
