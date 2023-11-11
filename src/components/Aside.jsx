import React, { useEffect, useState } from 'react';
import { Button, Header, List, Menu, Popup } from 'semantic-ui-react';
import './Aside.css';
import request, { getOptions } from '../utils/request';
import { Link, useNavigate } from 'react-router-dom';

function Aside(props) {
  const activeItem = 'home';
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const handleItemClick = () => {
  }

  useEffect(() => {
    initalRequest();
  }, []);

  const initalRequest = async () => {
    try {
      const options = getOptions();
      const uri = '/play-list';

      const list = await request(uri, options);

      setList(list)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <nav style={{borderRadius: 15, overflow: 'hidden', margin: '20px 0' }}>
        <Menu inverted vertical fluid>
          <Menu.Item
            name='Inicio'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            icon="home"
          />
          <Menu.Item
            name='Buscar'
            icon="search"
            active={activeItem === 'messages'}
            onClick={() => {
              navigate('/genders')
              props.onSearchFocus()
            }}
          />
          <Menu.Item
            name='Lista de Canciones'
            active={activeItem === 'friends'}
            onClick={handleItemClick}
          />
        </Menu>
      </nav>
      <aside>
        {/* Componente Aside */}
        <div className="spotify-aside" style={{backgroundColor: '#1B1C1D', minHeight: 500}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Header inverted as="h3" className='m-0'>Tu Biblioteca</Header>
            <Popup content='crear nueva lista' trigger={
              <Link to={'/playlist/create'} style={{color: '#fff'}}>
                <Button circular size='small' inverted icon='add'/>
              </Link>
            } />
          </div>
          
          <List divided relaxed inverted size='large'>
            {list.map(item => (
              <Link to={'/playlist/' + item.playListId} style={{color: '#fff'}}>
                <List.Item style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                  <div style={{height: 50, width: 50}}>
                    <img height="100%" width="100%" src={item.thumbnail?.thumbnailUrl} alt="playlist_logo" />
                  </div>
                  <List.Content>
                    <List.Header>
                      <Header as="h3" inverted>{item.playListName}</Header>
                    </List.Header>
                    <List.Description>{item.playListDescription}</List.Description>
                  </List.Content>
                </List.Item>
              </Link>
            ))}
          </List>
        </div>
      </aside>
    </div>
  );
}

export default Aside;