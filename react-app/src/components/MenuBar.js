import React, { useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

export default function MenuBar(props) {
  const pathname = window.location.pathname,
        path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);
  const { user, logout } = useContext(AuthContext);

  const handleClick = (e, { name }) => setActiveItem(name);

  const menuItems = user
  ? (
      <React.Fragment>
        <Menu.Item
          name={ user.username }
          active={activeItem === user.username || activeItem === 'home'}
          onClick={ handleClick }
          as={ Link }
          to='/'
          replace
        />
        <Menu.Item
          name="CrearEvento"
          active={activeItem === "CrearEvento"}
          onClick={ handleClick }
          as={ Link }
          to='/crear-evento'
          replace
        />
        <Menu.Item
          name="MisEventos"
          active={activeItem === "MisEventos"}
          onClick={ handleClick }
          as={ Link }
          to='/mis-eventos'
          replace
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='cerrar sesion'
            onClick={ logout }
          />
        </Menu.Menu>
      </React.Fragment>
  )
  : (
    <React.Fragment> 
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleClick}
        as={Link}
        to='/'
        replace
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={ activeItem === 'login' }
          onClick={ handleClick }
          as={ Link }
          to='/login'
          replace
        />
        <Menu.Item
          name='register'
          active={ activeItem === 'register' }
          onClick={ handleClick }
          as={ Link }
          to='/register'
          replace
        />
      </Menu.Menu>
    </React.Fragment>
  )

  return (
    <Menu color="teal">
      { menuItems }
    </Menu>
  )
}