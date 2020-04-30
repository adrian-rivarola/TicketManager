import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Event from '../components/Event';

import { Segment, Divider, Header, Icon, Card } from 'semantic-ui-react';

export default function ListaEventos(props) {
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
		  { !loading &&
			  <Card.Group stackable itemsPerRow={2} className="ticket-group" >
				  { data && data.ver_eventos.length > 0
				  	? data.ver_eventos.map((event, idx) => <Event key={idx} event={event} />)
				  	: <Card header="Aún no tienes eventos :(" />
				  }
				</Card.Group>
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