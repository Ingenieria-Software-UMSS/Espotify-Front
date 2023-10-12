import React from 'react'
import "./App.css"
import LogeadoNavegacion from './LogeadoNavegacion'
import { getAuth } from "firebase/auth"
import { PlayerProvider } from './context/PlayerContext'
//console.log(getAuth);

const App = () => {
  return (
    <PlayerProvider>
      <LogeadoNavegacion />
    </PlayerProvider>
  )
}

export default App
