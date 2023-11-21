// import {collection, getDocs} from "firebase/firestore";
// import {map} from "lodash"
// import {db} from "../utils"
import axios from 'axios';
import { getAuthToken } from '../api/axios_helper'


export class Cancion {
    collectionName = "canciones";

    //crear artista

    async obtenerTodas() {
        try {
            // const docRef = collection(db, this.collectionName);
            // const snapshot = await getDocs(docRef);
            // return map(snapshot.docs, (doc) => doc.data());
            // const response = await fetch("http://localhost:8080/song");
            const response = await fetch("https://espotify.azurewebsites.net/song");
            const items = await response.json();
            //utiliza la nueva base de datos
            return items.map((item) => {
                return {
                    "artista": item.artist.artistName,
                    "id": item.songId,
                    "urlCancion": item.songUrl,
                    "album": item.songAlbum,
                    "duracion": item.songDuration,
                    "nombre": item.songTitle,
                    "urlImagen": item.thumbnail.thumbnailUrl
                };
            });

        } catch (error) {
            throw error
        }
    }
    // canciones del historial

    async getHistorial() {
        try {
            let headers = {};

            const url = "https://espotify.azurewebsites.net/play-history";


            const token = window.localStorage.getItem("auth_token"); // Awaiting getToken() to execute and return value before executing the next line

            const promise = axios.get('https://espotify.azurewebsites.net/play-history', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const dataPromise = promise.then((response)=>response.data);

            return dataPromise;

        } catch (error) {
            throw error;
        }
    }

    async saveSongHistorial(data) {
        try {
            

            const token = window.localStorage.getItem("auth_token"); // Awaiting getToken() to execute and return value before executing the next line

            const promise = axios.post('https://espotify.azurewebsites.net/play-history',data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (error) {
            throw error;
        }
    }


}