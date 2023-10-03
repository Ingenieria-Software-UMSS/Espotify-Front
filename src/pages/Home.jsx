import React, {useEffect, useState} from 'react';
import { Button } from 'semantic-ui-react'
import {Cancion} from "../api/Cancion"
import "./Home.css";
import ListaCanciones from '../components/ListaCanciones';

import {UsarPlayer} from "../hooks/UsarPlayer"

const cancionController = new Cancion();



export default function Home () {

    const [canciones, setCanciones] = useState(null);

    //console.log(UsarPlayer());

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

    return (
      <div className='canciones'>
        <h1>Home Principal</h1>

        <ListaCanciones canciones={canciones}/>

      </div>
    )
  }