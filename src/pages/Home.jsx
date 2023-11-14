import React, {Fragment, useEffect, useState} from 'react';
import {Cancion} from "../api/Cancion";
import "./Home.css";
import { map } from 'lodash';
import ListaCanciones from '../components/ListaCanciones';
import Slider from '../components/Slider';

const cancionController = new Cancion();

export default function Home () {
  const [canciones, setCanciones] = React.useState([]);
  const [cancionesHistorial,setCancionesHistorial] = React.useState([]);

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
    /**e aqui obtener el historial */
    useEffect(() =>{
      (async () => {
        try {
          let data = [];
          const result = await cancionController.obtenerTodas();
          // const dataTemp = map(result, (dataSong) =>({
          //   ...dataSong,
          // }))
          // data.push(...dataTemp);
          // console.log(data);

          setCancionesHistorial(result);
          console.log(cancionesHistorial);
        } catch (error) {
          console.error(error);
        }
      })();
    },[]);

    return (
      <div className='contenedor-canciones-slider'>
       
        <div className='canciones'>

          <h1>Lista de canciones</h1>
          <ListaCanciones canciones={canciones}/>
        </div>

        <div className='historial-slider'>
          {/* <Slider data={cancionesHistorial}> */}
          <Slider data={cancionesHistorial}/>
        </div>


      </div>
    )
  }
