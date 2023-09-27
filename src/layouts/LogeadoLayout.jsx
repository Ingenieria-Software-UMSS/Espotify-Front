
import React from 'react'
import "./Logueado.css"



const LogeadoLayout = (props) => {

  const { children } = props;
  return (
    <div className='logged-layout'>

      <div className='contenido'>
        <div className='menu-izquierdo'>
          <p>Menu Izquierdo</p>
        </div>

        <div className='principal'>
          <div className='barra-superior'>
            <p>barra superior de busqueda</p>
          </div>

          <div> {children}</div>


        </div>

      </div>

      <div className='footer'>
        <p>Reproductor Musica</p>
      </div>




    </div>
  )
}

export default LogeadoLayout