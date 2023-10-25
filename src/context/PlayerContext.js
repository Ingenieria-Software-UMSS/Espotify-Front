import React, { useState, createContext } from "react"

export const PlayerContext = createContext({});

export function PlayerProvider(props) {
    const { children } = props;
    const [cancion, setCancion] = useState(null);
    const [play, setPlay] = useState(false);
    const [volumen, setVolumen] = useState(0.5);

    const playCancion = (songData) => {
        const cancionData = {
            id: songData.songId,
            nombre: songData.songTitle,
            duracion: songData.songDuration,
            urlImagen: songData.thumbnail.thumbnailUrl,
            urlCancion: songData.songUrl,
            album: songData.songAlbum,
            artista: songData.artist.artistName,
        };

        setCancion(cancionData);
        setPlay(true);
    }

    const pause = () => setPlay(false);

    const resume = () => setPlay(true);

    const data = {
        cancion,
        play,
        volumen,
        playCancion,
        pause,
        resume,
        setVolumen
    };

    return (
        <PlayerContext.Provider value={data}>
            {children}
        </PlayerContext.Provider>
    )
}
