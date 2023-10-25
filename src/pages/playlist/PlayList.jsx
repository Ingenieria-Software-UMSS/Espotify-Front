import React, { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Dropdown,
  Header,
  Loader,
  Popup,
} from "semantic-ui-react";
import "./playlist.css";

import logo from "../../assets/logo.jpg";
import request, { getOptions } from "../../utils/request";
import PlayListForm from "../../components/PlayListForm";
import { useParams } from "react-router-dom";

const initialForm = {
  playListName: "Nuevo Playlist",
  playListDescription: "Description del nuevo playlist",
  thumbnail: {
    thumbnailUrl: logo,
  } 
};

export default function PlayList() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({...initialForm});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if(params.id === 'create') {
      setState({...initialForm});
    } else {
      initialRequest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const initialRequest = async () => {

    setLoading(true);

    try {
      const options = getOptions();
      const uri = '/play-list/' + params.id;
      const paylist = await request(uri, options);

      setState({
        playListId: paylist.playListId,
        playListName: paylist.playListName,
        playListDescription: paylist.playListDescription,
        thumbnail: paylist?.thumbnail,
      })
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="playlist">
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <div className="playlist_banner">
          <img
            className="playlist_img"
            onClick={handleOpen}
            src={state.thumbnail.thumbnailUrl}
            alt="playlist_image"
          />
          <div className="song_area" onClick={handleOpen}>
            <Header as="h4">Playlist</Header>
            <Header as="h1">{state.playListName}</Header>
            <Header as="h4">{state.playListDescription}</Header>
          </div>
          <div className="add_action">
            <Dropdown
              icon={null}
              trigger={
                <Popup
                  basic
                  className="popup_style"
                  content="Agregar/Editar playlist"
                  position="top right"
                  trigger={
                    <Button
                      className="custom_icon_button"
                      circular
                      color="black"
                      icon="ellipsis horizontal"
                    />
                  }
                />
              }
              direction="left"
            >
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleOpen} text="Editar" />
                <Dropdown.Item text="Eliminar" />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="list_songs"></div>
      </div>
      {open && <PlayListForm {...{setOpen, setState, state}} />}
    </>
  );
}
