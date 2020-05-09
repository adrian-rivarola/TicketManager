import React, { useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Message, Header, Icon, Card } from 'semantic-ui-react';

import Event from '../components/Event';
import EventModal from '../components/EventModal';

export default function ListaEventos(props) {
  const [mensaje, setMensaje] = useState('');
	const {
	    loading,
	    data
	  } = useQuery(GET_EVENTS_QUERY);

	return (
		<Segment raised loading={loading}>
			<Divider horizontal>
		    <Header as='h4'>
		      <Icon name='group' />
		      Mis Eventos
		    </Header>
		  </Divider>
      { mensaje && 
        <Message
          positive
          size="small"
          content={mensaje}
          className="event-msg"
          onDismiss={() => setMensaje("")} /> 
      }
      { !loading &&
        ( data && data.ver_eventos.length > 0
          ? <Card.Group stackable className="ticket-group" > 
            {
              data.ver_eventos.map((event, idx) => <Event key={idx} event={event} />)
            }
            </Card.Group>
          
          : <Card centered className="new-event">
              <Card.Content header="Aún no has creado un evento"  />
              <Card.Content description="Lorem ipsum"/>
              <Card.Content>
                  <EventModal setMensaje={setMensaje} />
              </Card.Content>
            </Card>
        )
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