import React from "react";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
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
          <img className="playlist_img" src={logo} alt="playlist_image" />
          <div className="song_area" onClick={handleOpen}>
            <Header as="h4">Playlist</Header>
            <Header as="h1">My Playlist #2</Header>
            <Header as="h4">J Carlos</Header>
          </div>
          <div className="add_action">
            <Popup
              basic
              className="popup_style"
              content="Add users to your feed"
              position="top right"
              trigger={
                <Dropdown
                  icon={null}
                  trigger={
                    <Button className="custom_icon_button" circular color="black" icon="ellipsis horizontal" />
                  }
                  direction="left"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item text="Editar" />
                    <Dropdown.Item text="Eliminar" />
                    <Dropdown.Item text="Aniadir" />
                  </Dropdown.Menu>
                </Dropdown>
              }
            />
          </div>
        </div>
        <div className="list_songs">
          List Songs
        </div>
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
            <Icon onClick={handleClose} size="large" name="remove"/>
          </div>
          <div className="playlist_form">
            <div className="form_image">
              <img width={200} src={logo} alt="paylist_logo" />
              <label className="custom_input">
                <i className="remove large icon"></i>
                <input type="file"/>
              </label>
            </div>
            <Form className="form_labels">
              <Input fluid placeholder='Search...' />
              <TextArea fluid placeholder='Tell us more' />
            </Form>
          </div>

          <Button   color="black" onClick={() => setOpen(false)}>
            Crear
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
}
