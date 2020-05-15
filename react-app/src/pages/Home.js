import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Header, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import ListaItems from '../components/ListaItems';
import Ticket from '../components/Ticket';
import TicketQR from '../components/TicketQR';


function UserHome(props) {
  const [tickets, setTickets] = useState([]);
  const {
      loading,
      data
    } = useQuery(GET_TICKETS_QUERY);

  useEffect(() => {
    if (data && data.ver_tickets && data.ver_tickets.length > 0)
      setTickets(data.ver_tickets);
  }, [data]);

  return (
    <Segment stacked color="teal" loading={loading}>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='ticket' />
          Mis tickets
        </Header>
      </Divider>
      { tickets.length > 0 &&
        <ListaItems 
          items={tickets}
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