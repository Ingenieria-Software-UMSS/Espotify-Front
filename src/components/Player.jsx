import React from 'react'
import { Icon, Progress } from "semantic-ui-react"
import ReactPlayer from 'react-player'
import { UsarPlayer } from '../hooks/UsarPlayer'
import "./Player.css"

const Player = () => {

  const {cancion, play, pause, resume, volumen} = UsarPlayer();
  //const playing = false;
  
  console.log(play);
  
  
  return (
    <div className='player'>
      <Icon name={play ? "pause circle outline" : "play circle outline"} onClick={play ? pause : resume} />
      <Progress progress='value' value={30} total={100} size='tiny' />

      <ReactPlayer url={cancion?.urlCancion} playing={play} height={0} width={0} volume={volumen}/>
    </div>
  )
}

export default Player
