import React from 'react'
import "./App.css"
import LogeadoNavegacion from './LogeadoNavegacion'
import { PlayerProvider } from './context/PlayerContext'

const App = () => {
  return (
    <PlayerProvider>
      <LogeadoNavegacion />
    </PlayerProvider>
  )
}

export default App
