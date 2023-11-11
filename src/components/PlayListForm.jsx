import React, { useState } from "react";
import {
  Button,
  Dimmer,
  Form,
  Header,
  Icon,
  Input,
  Loader,
  Modal,
  TextArea,
} from "semantic-ui-react";

import request, { postOptions, postOptionsFormData, putOptions } from "../utils/request";
import { useNavigate } from "react-router-dom";

const initialForm = {
  playListName: "",
  playListDescription: "",
};

let currentImage = null;
export default function PlayListForm({setOpen, state, setState}) {
  const [form, setForm] = useState({...initialForm, ...state});
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostarMensage, setMostarMensage] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    if(!mostarMensage) {
      setMostarMensage(true);
    } else {
      currentImage = null;
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onChangeImage = (event) => {
    const files = event.target.files;

    currentImage = files[0];
    const uri = URL.createObjectURL(currentImage);

    setImageUri(uri);
  };

  const handleChange = (event) => {
    const name = event.target.name; 
    const value = event.target.value; 

    if(name === 'playListName' && (value.length > 50 || !value.match(/^([a-z\sA-Z]?)+$/))) {
      return; 
    }

    if(name === 'playListDescription' && (value.length > 120 || !value.match(/^([a-z\sA-Z]?)+$/))) {
      return; 
    }

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let thumbnailId;

      if(currentImage) {
        const image = await uploadImage();

        thumbnailId = image.thumbnailId;
      } else {
        thumbnailId = form?.thumbnail?.thumbnailId;
      }

      let uri = "/play-list";
      const body = {
        ...form,
        thumbnail: {
          thumbnailId,
        },
      };

      let options = postOptions(body);

      if(body.playListId) {
        uri += `/${body.playListId}`
        delete body.playListId;
        delete body.playListSongList;
        delete body.creationDate;

        options = putOptions(body);
      }

      const paylist = await request(uri, options);

      paylist.thumbnail.thumbnailUrl = imageUri ?? form.thumbnail.thumbnailUrl; 

      setState({...paylist});

      navigate('/playlist/' + paylist.playListId);
    } catch (error) {
      console.log(error);
    }

    currentImage = null;
    setOpen(false);
  };

  const uploadImage = () => {
    const formData = new FormData();

    const imageMeta = {
      filename: "playlist_image",
    };

    formData.append("jsonThumbnail", JSON.stringify(imageMeta));
    formData.append("image", currentImage);

    let uri = "/thumbnail";
    let options = postOptionsFormData(formData);

    return request(uri, options);
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      onOpen={handleOpen}
      size="tiny"
      className="sw_modal"
    >
      <Modal.Content className="sw_modal_box">
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <div className="modal_header">
          {mostarMensage ? (
            <Header as="h3">
              Pulsa Guardar para conservar los cambios que has hecho
            </Header>
          ) : <span></span>}
          <Icon onClick={handleClose} size="large" name="remove" />
        </div>
        <Form onSubmit={handleSubmit} className="playlist_form">
          <div className="form_image">
            <img width={200} src={imageUri ?? form.thumbnail.thumbnailUrl} alt="paylist_logo" />
            <label className="custom_input">
              <Icon name="edit" size="big" />
              <input onChange={onChangeImage} type="file" />
            </label>
          </div>
          <div className="form_labels">
            <Input
              fluid
              required
              value={form.playListName}
              name="playListName"
              onChange={handleChange}
              placeholder="Titulo"
            />
            <TextArea
              value={form.playListDescription}
              onChange={handleChange}
              name="playListDescription"
              placeholder="Descripcion"
            />
            <Button
              className="send_button"
              color="black"
              size="large"
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
