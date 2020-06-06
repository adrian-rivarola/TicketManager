import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';

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
    <Menu attached='top'>
      <Menu.Item
        as={NavLink}
        exact
        to='/'
        replace 
      >
        { user
          ? user.username
          : <FormattedMessage id='home' />
        }
      </Menu.Item>
      { user
        ? <React.Fragment>
            <Menu.Item
              as={NavLink}
              to='/eventos'
            >
              <FormattedMessage id='events.title' />
            </Menu.Item>
            <Menu.Menu position='right'>
              {languageDropdown}
              <Menu.Item
                onClick={logout}
              >
                <FormattedMessage id='logout' />
              </Menu.Item>
            </Menu.Menu>
          </React.Fragment>

        : <Menu.Menu position='right'>
            {languageDropdown}
            <Menu.Item
              as={NavLink}
              to='/login'
              replace
            >
              <FormattedMessage id='login' />
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to='/register'
              replace
            >
              <FormattedMessage id='register' />
            </Menu.Item>
          </Menu.Menu>
      }
    </Menu>
  )
}

export default React.memo(MenuBar);