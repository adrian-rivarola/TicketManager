import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Header, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import ListaItems from '../components/ListaItems';
import Ticket from '../components/Ticket';
import TicketQR from '../components/TicketQR';


function UserHome(props) {
  const {
      loading,
      data
    } = useQuery(GET_TICKETS_QUERY);

  return (
    <Segment stacked color="teal" loading={loading}>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='ticket' />
          Mis tickets
        </Header>
      </Divider>
      { data && data.ver_tickets.length > 0 &&
        <ListaItems 
          items={data.ver_tickets}
          itemComponent={Ticket}
          modalHeader="Ticket"
          modalComponent={TicketQR}
          sendActiveItemAs='ticket'
        />
       }
    </Segment>
  );
}

export default function Home(props) {
  const { user } = useContext(AuthContext);

  return user 
    ? <UserHome /> 
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