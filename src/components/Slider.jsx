import React, { useState, useEffect, useRef } from 'react'
import { Image, Icon } from 'semantic-ui-react'
import Slick from "react-slick"
import { map } from 'lodash'
import { Link } from 'react-router-dom'
import "./Slider.css"
import { UsarPlayer } from '../hooks/UsarPlayer'


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  sliderToScroll: 1,
  // swipeToSlide: true,
  // centerMode: true,
}

const Slider = (props) => {
  
  const { data } = props;

  const {playCancion} = UsarPlayer();

  return (
    <Slick {...settings} className="slider">
      {map(data, (item) => {
        return (
          <div key={item.id} className='slider-item' onClick={()=>playCancion(item)}>
            <div className='slide-item-block-play'>
              <Image src={item.urlImagen} alt={item.nombre}/>
              <Icon name='play circle outline' />
            </div>


            <h3>{item.nombre}</h3>
          </div>
        )
      })}
    </Slick>
  )
}

export default Slider
