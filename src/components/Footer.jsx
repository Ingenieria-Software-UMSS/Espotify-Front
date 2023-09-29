

import React from 'react'
import "./Footer.css"
import {Image, Input, Icon} from "semantic-ui-react"
import Player from './Player'


const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerIzquierda'>
        <Image src = {null} className='imagenMiniatura'/>
        <div className='infoCancion'>
          <p>nombre artista</p>
        
        <p>nombre cancion</p>
        </div>
        
      </div>

      <div className='footerCentro'>
        <Player/>
      </div>

      <div className='footerDerecha'>
        <Input label={<Icon name="volume up" className='iconVolumen' />} type='range' min={0} max={1} step={0.01} />
      </div>
    </div>
  )
}

export default Footer
