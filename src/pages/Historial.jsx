
import React, { useState, useEffect } from 'react'
import { Cancion as CancionController } from "../api/Cancion"
import "./Historial.css"
import HistorialBanner from '../components/HistorialBanner';
import ListSongsHistory from '../components/ListSongsHistory';
import { useLocation } from 'react-router-dom';
import { getCancionesHistorial, request, setAuthToken } from '../api/axios_helper';
import axios from 'axios';
import { map } from 'lodash';

const cancionController = new CancionController();


const Historial = () => {




  const [songs, setSongs] = useState(null);

  const obtenerCanciones = (canciones) => {
    return canciones.map((item) => {
      return {
        "artista": item.song.artistName,
        "id": item.song.songId,
        "urlCancion": item.song.songUrl,
        "album": item.song.songAlbum,
        "duracion": item.song.songDuration,
        "nombre": item.song.songTitle,
        "urlImagen": item.song.thumbnailUrl
      };
    });

  }

  useEffect(() => {
    (async () => {
      try {


        const response = await cancionController.getHistorial();

        console.log("HISTORIALLLLLL")
        console.log(obtenerCanciones(response));

        setSongs(obtenerCanciones(response));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await cancionController.obtenerTodas();
  //       setSongs(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);


  return (
    <div className='historial-page'>
      <HistorialBanner />
      <ListSongsHistory songs={songs} />
    </div>
  )
}

export default Historial