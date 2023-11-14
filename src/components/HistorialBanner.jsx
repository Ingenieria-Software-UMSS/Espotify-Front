import React from 'react'
import banner from '../assets/banner1.jpg';
import "./HistorialBanner.css"


const HistorialBanner = () => {
  return (
    <div className='historial-banner'>
      <div className='historial-banner-image' style={{backgroundImage:`url(${banner})`}}>

        <h1>Historial</h1>
      </div>

      <div className='historial-banner-gradient'></div>
       

    </div>
  )
}

export default HistorialBanner
