import React, { useEffect, useState } from 'react';
import ListaCanciones from '../components/ListaCanciones';
import {getSongList} from "../api/services/songService";

export default function Home() {
    const [canciones, setCanciones] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getSongList();
                console.log(response);
                setCanciones(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className='canciones'>
            <h1>Lista de canciones</h1>
            <ListaCanciones canciones={canciones} />
        </div>
    )
}