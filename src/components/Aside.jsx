import React from 'react';
import { Button, Icon, List, Popup } from 'semantic-ui-react';
import './Aside.css';
import logo from '../assets/logo.jpg';

function App() {
  return (
    <div>
      <nav>
        {/* Menú de navegación principal */}
        <ul>
          
          <Button className='superior' fluid>
            <Icon name='home' /> Inicio
          </Button>
          <Button className='superior' fluid>
            <Icon name='search' /> Buscar
          </Button>
          <Button className='superior' fluid>
            <Icon name='list' /> Lista de Canciones 
          </Button>
        </ul>
      </nav>
      <aside>
        {/* Componente Aside */}
        <div className="spotify-aside">
          <Popup content='contraer' trigger={
            <Button icon name="book">Tu Biblioteca</Button>
            }
            />
          <Popup content='crear nueva lista' trigger={
            <Button icon='add'/>}
            />
          
          <h3>Tus Canciones</h3>
          <List divided relaxed>
            <List.Item>
              <List.Icon>
                <img width={200} src={logo} alt="playlist_logo" />
              </List.Icon>
              <List.Content>
                <List.Header as='a'>lista 1</List.Header>
                <List.Description as='a'>descripcion</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon>
                <img width={200} src={logo} alt="playlist_logo" />
              </List.Icon>
              <List.Content>
                <List.Header as='a'>lista 2</List.Header>
                <List.Description as='a'>descripcion</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon>
                <img width={200} src={logo} alt="playlist_logo" />
              </List.Icon>
              <List.Content>
                <List.Header as='a'>lista 3</List.Header>
                <List.Description as='a'>descripcion</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </div>
      </aside>
    </div>
  );
}

export default App;
