

import React from 'react'
import {Image, Input, Icon} from "semantic-ui-react"
import Player from './Player'
import { UsarPlayer } from '../hooks/UsarPlayer'
import "./Footer.css"


const Footer = () => {
  
  const {cancion, volumen, setVolumen} = UsarPlayer();
  
  
  return (
    <div className='footer'>
      <div className='footerIzquierda'>
        <Image src = {null} className='imagenMiniatura'/>
        <div className='infoCancion'>
          <p>nombre artista</p>
          {cancion && <p>{cancion.nombre}</p>}
        </div>
        
      </div>

      <div className='footerCentro'>
        <Player/>
      </div>

      <div className='footerDerecha'>
        <Input 
          label={<Icon name="volume up" className='iconVolumen' />}
           type='range' 
           min={0} 
           max={1} 
           step={0.01} 
           value={volumen}
           onChange={(_, data)=> setVolumen(Number(data.value))}
           />
      </div>
    </div>
  )
}

export default Footer
