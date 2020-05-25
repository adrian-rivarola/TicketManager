import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function MenuBar({ setLocale }) {
  const { user, logout } = useContext(AuthContext);
  
  const languageDropdown = (
    <Dropdown item icon='globe'>
      <Dropdown.Menu>
        <Dropdown.Item 
          content='Español'
          onClick={() => setLocale('es')}
        />
        <Dropdown.Item 
          content='English'
          onClick={() => setLocale('en')}
        />
        <Dropdown.Item 
          content='Deutsch'
          onClick={() => setLocale('de')}
        />
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <Menu size="large">
      <Menu.Item
        name={(user && user.username) || 'Inicio'}
        as={NavLink}
        exact
        to='/'
        replace />
      { user
        ? <React.Fragment>
            <Menu.Item
              name='MisEventos'
              as={NavLink}
              to='/eventos'
            />
            <Menu.Menu position='right'>
              { languageDropdown }
              <Menu.Item
                name='cerrar sesion'
                onClick={logout}
              />
            </Menu.Menu>
          </React.Fragment>

        : <Menu.Menu position='right'>
            {languageDropdown}
            <Menu.Item
              name='Acceder'
              as={NavLink}
              to='/login'
              replace
            />
            <Menu.Item
              name='Registrarse'
              as={NavLink}
              to='/register'
              replace
            />
          </Menu.Menu>
      }
    </Menu>
  )
}

export default React.memo(MenuBar);