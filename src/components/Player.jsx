import React, {useState} from 'react'
import { Icon, Progress } from "semantic-ui-react"
import ReactPlayer from 'react-player'
import { UsarPlayer } from '../hooks/UsarPlayer'
import "./Player.css"

const Player = () => {

  const {cancion, play, pause, resume, volumen} = UsarPlayer();
  //const playing = false;
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0);

  //console.log(play);
  const enProgreso = (data) => {
    setTotalSeconds(data.loadedSeconds);
    setCurrentSeconds(data.playedSeconds);
    //console.log(data);
  }
  
  return (
    <div className='player'>
      <Icon name={play ? "pause circle outline" : "play circle outline"} onClick={play ? pause : resume} />
      <Progress progress='value' value={currentSeconds} total={totalSeconds} size='tiny'/>

      <ReactPlayer url={cancion?.urlCancion} playing={play} height={0} width={0} volume={volumen} onProgress={enProgreso}/>
    </div>
  )
}

export default Player
