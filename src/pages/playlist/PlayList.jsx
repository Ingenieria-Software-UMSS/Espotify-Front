import React from "react";
import {
  Button,
  Dropdown,
  Form,
  Header,
  Icon,
  Input,
  Modal,
  Popup,
  TextArea,
} from "semantic-ui-react";
import "./playlist.css";

import logo from "../../assets/logo.jpg";

export default function PlayList() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="playlist">
        <div className="playlist_banner">
          <img
            className="playlist_img"
            onClick={handleOpen}
            src={logo}
            alt="playlist_image"
          />
          <div className="song_area" onClick={handleOpen}>
            <Header as="h4">Playlist</Header>
            <Header as="h1">My Playlist #2</Header>
            <Header as="h4">J Carlos</Header>
          </div>
          <div className="add_action">
            <Dropdown
              icon={null}
              trigger={
                <Popup
                  basic
                  className="popup_style"
                  content="Add users to your feed"
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
                {/* <Dropdown.Item text="Aniadir" /> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="list_songs"></div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        size="tiny"
        className="sw_modal"
      >
        <Modal.Content className="sw_modal_box">
          <div className="modal_header">
            <Header as="h3">Edit Playlist</Header>
            <Icon onClick={handleClose} size="large" name="remove" />
          </div>
          <div className="playlist_form">
            <div className="form_image">
              <img width={200} src={logo} alt="paylist_logo" />
              <label className="custom_input">
                <Icon name="edit" size="big" />
                <input type="file" />
              </label>
            </div>
            <Form className="form_labels">
              <Input fluid placeholder="Titulo" />
              <TextArea fluid placeholder="Descripcion" />
            </Form>
          </div>

          <Button
            className="send_button"
            color="black"
            size="large"
            onClick={() => setOpen(false)}
          >
            Crear
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
}
