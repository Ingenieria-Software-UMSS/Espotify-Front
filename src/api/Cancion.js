import {collection, getDocs} from "firebase/firestore";
import {map} from "lodash"
import {db} from "../utils"


export class Cancion {
    collectionName = "canciones";

    //crear artista

    async obtenerTodas(){
        try {
            const docRef = collection(db, this.collectionName);
            const snapshot = await getDocs(docRef);
            return map(snapshot.docs, (doc) => doc.data());
            
        } catch (error) {
            throw error
        }
    }
}