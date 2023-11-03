// import {collection, getDocs} from "firebase/firestore";
// import {map} from "lodash"
// import {db} from "../utils"


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
            const items =  await response.json();
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
}