import React, { useEffect, useState } from 'react';
import { Icon, Progress } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import { UsarPlayer } from '../hooks/UsarPlayer';
import './Player.css';

const Player = (props) => {
  const { cancion, play, pause, resume, volumen } = UsarPlayer();
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [showTotalSeconds, setShowTotalSeconds] = useState(0);
  const [showCurrentSeconds, setShowCurrentSeconds] = useState(0);
  const [totalCancionDB, setTotalCancionDB] = useState('00:00');
  const [bloqueo, SetBloqueo] = useState(true);

  useEffect(() => {
    setShowCurrentSeconds(formatear(currentSeconds));
    setShowTotalSeconds(formatear(totalSeconds));
  });

  const enProgreso = (data) => {
    setTotalSeconds(data.loadedSeconds);
    setCurrentSeconds(data.playedSeconds);
    obtainTotalCancion();
    desbloquearBotonPlay();
  };

  const obtainTotalCancion = () => {
    setTotalCancionDB(cancion.duracion);
  };

  const desbloquearBotonPlay = () => {
    SetBloqueo(false);
  };

  const formatear = (tiempo) => {
    const minutos = Math.floor(tiempo / 60) < 10 ? `0${Math.floor(tiempo / 60)}` : Math.floor(tiempo / 60);
    const segundos = Math.floor(tiempo % 60) < 10 ? `0${Math.floor(tiempo % 60)}` : Math.floor(tiempo % 60);
    return `${minutos}:${segundos}`;
  };

  const handleEnded = () => {
    pause();
    SetBloqueo(false);
  };

  return (
      <div className="player">
        <Icon name={play ? 'pause circle outline' : 'play circle outline'} onClick={play ? pause : resume} disabled={bloqueo} />
        <div className="progress">
          <p className="time-left">{showCurrentSeconds}</p>
          <Progress progress="value" value={Math.floor(currentSeconds)} total={totalSeconds} size="tiny" className="barraProgreso" />
          <p className="time-right">{totalCancionDB}</p>
        </div>
        <ReactPlayer
            url={cancion?.urlCancion}
            playing={play}
            height={0}
            width={0}
            volume={volumen}
            onProgress={enProgreso}
            muted={props.mute}
            onEnded={handleEnded}
        />
      </div>
  );
};

export default Player;
