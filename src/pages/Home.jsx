import React, { useState } from 'react';
import { Button } from "semantic-ui-react";

export default function Home() {
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
        <div>
            <h1>Home Principal</h1>
            <Button primary onClick={handleInfoClick}>Informacion Cancion</Button>
        </div>
    );
}
