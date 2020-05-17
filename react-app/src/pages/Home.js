import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Header, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import ListaItems from '../components/ListaItems';
import Ticket from '../components/Ticket';
import TicketQR from '../components/TicketQR';


function UserHome({ logout }) {
  const {
    loading,
    data,
    error
  } = useQuery(GET_TICKETS_QUERY);

  if (error){
    logout();
    alert('Algo salio mal, vuelve a iniciar sesión');
    return <Redirect to="/login" />
  }

  return (
    <Segment stacked color="teal" loading={loading}>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='ticket' />
          Mis tickets
        </Header>
      </Divider>
      { data &&
        data.ver_tickets.length > 0
        ? <ListaItems 
            items={data.ver_tickets}
            itemComponent={Ticket}
            modalHeader="Ticket"
            modalComponent={TicketQR}
            sendActiveItemAs='ticket'
          />
        : <Segment padded textAlign="center" className="no-items">
            <p>Aquí aparecerán los tickets que te envíen</p>
          </Segment>
       }
    </Segment>
  );
}

export default function Home(props) {
  const { user, logout } = useContext(AuthContext);

  return user 
    ? <UserHome logout={logout} /> 
    : <div className="ui padded raised segment">
        <h2>Bienvenido</h2>
      </div>;
}

const GET_TICKETS_QUERY = gql`
  {
    ver_tickets {
      id
      event {
        id
        name
        description
        date
        location
      }
      isValid
    }
  }
`;