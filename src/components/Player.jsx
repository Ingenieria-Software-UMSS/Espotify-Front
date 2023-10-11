import React, { useEffect, useState } from 'react'
import { Icon, Progress } from "semantic-ui-react"
import ReactPlayer from 'react-player'
import { UsarPlayer } from '../hooks/UsarPlayer'
import "./Player.css"
import { set } from 'lodash'

const Player = (props) => {


  const { cancion, play, pause, resume, volumen } = UsarPlayer();
  //const playing = false;
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const [showTotalSeconds, setShowTotalSeconds] = useState(0)
  const [showCurrentSeconds, setShowCurrentSeconds] = useState(0);

  const [totalCancionDB, setTotalCancionDB] = useState('00:00');
  //console.log(cancion);
  
  useEffect(() => {

    setShowCurrentSeconds(formatear(currentSeconds))
    setShowTotalSeconds(formatear(totalSeconds));
    
  })

  //console.log(play);
  const enProgreso = (data) => {

    // const segundos = (Math.round(data.playedSeconds % 0x3C)).toString();
    // const minutos  = (Math.floor(data.playedSeconds / 0x3C ) % 0x3C).toString();
    // let nuevoCurrent = minutos + ':'+ segundos;
    // //console.log(nuevo)
    // const segundosTotal = (Math.round(data.loadedSeconds % 0x3C)).toString();
    // const minutosTotal  = (Math.floor(data.loadedSeconds / 0x3C ) % 0x3C).toString();
    // let nuevoTotal = '0'+minutosTotal + ':'+ segundosTotal;
    // setShowCurrentSeconds(nuevoCurrent);
    // setShowTotalSeconds(nuevoTotal);


    // setTotalSeconds(data.loadedSeconds);
    // setCurrentSeconds(data.playedSeconds);


    // setShowCurrentSeconds(formatear(data.playedSeconds));
    // setShowTotalSeconds(formatear(data.loadedSeconds));
    setTotalSeconds(data.loadedSeconds);
    setCurrentSeconds(data.playedSeconds);

    obtainTotalCancion();
    //console.log(data);
  }

  const obtainTotalCancion= ()=>{
    setTotalCancionDB(cancion.duracion);
  }

  const formatear = (tiempo) => {

    const minutos = Math.floor(tiempo / 60) < 10 ? `0${Math.floor(tiempo / 60)}` : Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60) < 10 ? `0${Math.floor(tiempo % 60)}` : Math.floor(tiempo % 60);

    return `${minutos}: ${segundos}`;

  };

  return (
    <div className='player'>
      <Icon name={play ? "pause circle outline" : "play circle outline"} onClick={play ? pause : resume} />
      <div className='progress'>

        <p className='time-left'>{showCurrentSeconds}</p>

        {/* <Progress progress='value' value={Math.floor(currentSeconds)} total={totalSeconds} size='tiny' className='barraProgreso' /> */}

        <Progress progress='value' value={Math.floor(currentSeconds)} total={totalSeconds} size='tiny' className='barraProgreso' />

        {/* <p className='time-right'>{showTotalSeconds}</p> */}
        <p className='time-right' >{totalCancionDB}</p>
      </div>

      <ReactPlayer url={cancion?.urlCancion} playing={play} height={0} width={0} volume={volumen} onProgress={enProgreso} muted={props.mute} />
    </div>
  )
}

export default Player
