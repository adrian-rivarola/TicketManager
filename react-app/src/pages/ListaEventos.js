import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Button, Header, Icon } from 'semantic-ui-react';

import ListaItems from '../components/ListaItems';
import Event from '../components/Event';
import TicketForm from '../components/TicketForm';

function ListaEventos(props) {
  const [events, setEvents] = useState([]);
  const {
      loading,
      data
    } = useQuery(GET_EVENTS_QUERY);
  
  useEffect(() => {
    if (data && data.ver_eventos && data.ver_eventos.length > 0)
      setEvents(data.ver_eventos);
  }, [data]);

  return (
    <Segment raised loading={loading}>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='group' />
          Mis Eventos
        </Header>
      </Divider>
      { events.length > 0 &&
        <ListaItems 
          items={events}
          itemComponent={Event}
          modalHeader="Enviar Ticket"
          modalComponent={TicketForm}
          sendActiveItemAs='event'
        />
      }
      { !loading && 
        <Divider horizontal>
          <Button
            icon="plus"
            color="teal"
            content="Nuevo "
            as={Link}
            to="mis-eventos/nuevo"
          />
        </Divider>
      }
    </Segment>
  );
}

export const GET_EVENTS_QUERY = gql`
  {
    ver_eventos {
      id
      name
      description
      date
      location
    }
  }
`;

export default React.memo(ListaEventos);