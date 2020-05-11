import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Button, Header, Icon, Card } from 'semantic-ui-react';

import Event from '../components/Event';

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
        <Card.Group stackable itemsPerRow={2} className="ticket-group" >
          { events.map((event, idx) => <Event key={idx} event={event} />) }
        </Card.Group>
      }
      { !loading && 
        <Divider horizontal>
          <Button
            icon="plus"
            color="teal"
            content="Nuevo Evento"
            className="new-event"
            as={Link}
            to="mis-eventos/nuevo"
          />
        </Divider>
      }
    </Segment>
  );
}

const GET_EVENTS_QUERY = gql`
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