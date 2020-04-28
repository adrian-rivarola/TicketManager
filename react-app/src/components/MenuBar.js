import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function MenuBar(props) {
  const pathname = window.location.pathname,
        path = pathname === '/' ? 'home' : pathname.substr(1);
  

  const [activeItem, setActiveItem] = useState(path);

  const handleClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu pointing secondary size="massive" color="teal">
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
      </Menu>
    </div>
  )
}