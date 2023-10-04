import React, {useEffect, useState} from 'react';
import {Cancion} from "../api/Cancion"
import "./Home.css";
import ListaCanciones from '../components/ListaCanciones';

const cancionController = new Cancion();

export default function Home () {

    const [canciones, setCanciones] = useState([]);

    useEffect(() =>{
      (async () => {
        try {
          
          const response = await cancionController.obtenerTodas();
          console.log(response);
          setCanciones(response);

        } catch (error) {
          console.error(error);
        }
      })();
    },[]);
    const [songInfo, setSongInfo] = useState({
        title: "My Song Title",
        artist: "Artist Name",
        duration: "3:45",
        description: "This is a brief description of the song."
    });

    const handleInfoClick = () => {
        window.location.href = `/cancion?title=${songInfo.title}&artist=${songInfo.artist}&duration=${songInfo.duration}&description=${songInfo.description}`;
    };

    return (
      <div className='canciones'>
        <h1>Lista de canciones</h1>

        <ListaCanciones canciones={canciones}/>
      </div>
    )
  }