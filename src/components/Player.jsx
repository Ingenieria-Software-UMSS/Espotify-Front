import React, { useState } from 'react'
import { Icon, Progress } from "semantic-ui-react"
import ReactPlayer from 'react-player'
import { UsarPlayer } from '../hooks/UsarPlayer'
import "./Player.css"

const Player = (props) => {

  const { cancion, play, pause, resume, volumen } = UsarPlayer();
  //const playing = false;
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const [showTotalSeconds, setShowTotalSeconds] = useState(0)
  const [showCurrentSeconds, setShowCurrentSeconds] = useState(0);

  //console.log(play);
  const enProgreso = (data) => {
    
    const segundos = (Math.round(data.playedSeconds % 0x3C)).toString();
    const minutos  = (Math.floor(data.playedSeconds / 0x3C ) % 0x3C).toString();
    let nuevoCurrent = minutos + ':'+ segundos;
    //console.log(nuevo)
    const segundosTotal = (Math.round(data.loadedSeconds % 0x3C)).toString();
    const minutosTotal  = (Math.floor(data.loadedSeconds / 0x3C ) % 0x3C).toString();
    let nuevoTotal = '0'+minutosTotal + ':'+ segundosTotal;
    setShowCurrentSeconds(nuevoCurrent);
    setShowTotalSeconds(nuevoTotal);
    
    

    setTotalSeconds(data.loadedSeconds);
    setCurrentSeconds(data.playedSeconds);

    //console.log(data);
  }


  const convertir = () =>{
    const segundos = (Math.round(currentSeconds % 0x3C)).toString();
    const minutos  = (Math.floor(currentSeconds / 0x3C ) % 0x3C).toString();
    let nuevo = minutos + ':'+ segundos;
    console.log(nuevo)
    setCurrentSeconds(nuevo)
  };

  return (
    <div className='player'>
      <Icon name={play ? "pause circle outline" : "play circle outline"} onClick={play ? pause : resume} />
      <div className='progress'>
        <span className='time-left'>{showCurrentSeconds}</span>
        <Progress progress='value' value={currentSeconds} total={totalSeconds} size='tiny' width='100px'/>
        <span className='time-right'>{showTotalSeconds}</span>
      </div>

      <ReactPlayer url={cancion?.urlCancion} playing={play} height={0} width={0} volume={volumen} onProgress={enProgreso} muted={props.mute}/>
    </div>
  )
}

export default Player
