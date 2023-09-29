import React from 'react'
import {Icon, Progress} from "semantic-ui-react"
import "./Player.css"

const Player = () => {

    const playing = false;
  return (
    <div className='player'>
      <Icon name= {playing ? "pause circle outline": "play circle outline"}/>
     <Progress progress= 'value' value = {30} total={100} size='tiny'/>
    
    </div>
  )
}

export default Player
