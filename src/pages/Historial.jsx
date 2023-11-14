
import React, {useState,useEffect} from 'react'
import {Cancion as CancionController} from "../api/Cancion"
import "./Historial.css"
import HistorialBanner from '../components/HistorialBanner';
import ListSongsHistory from '../components/ListSongsHistory';

const cancionController = new CancionController();


const Historial = () => {

    const [songs, setSongs] = useState(null);

    useEffect(()=>{
        (async ()=>{
            try {
                const response = await cancionController.obtenerTodas();
                setSongs(response);
            } catch (error) {
                console.log(error);
            }
        })();
    },[]);



  return (
    <div className='historial-page'>
      <HistorialBanner/>
      <ListSongsHistory songs={songs}/>
    </div>
  )
}

export default Historial