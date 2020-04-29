import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

import { Segment, Divider, Header, Icon, Card } from 'semantic-ui-react';
import Ticket from '../components/Ticket';

function UserHome(props) {
	const {
	    loading,
	    data
	  } = useQuery(GET_TICKETS_QUERY);

	return (
		<Segment raised loading={loading}>
			<Divider horizontal>
		    <Header as='h4'>
		      <Icon name='ticket' />
		      Mis tickets
		    </Header>
		  </Divider>
		  { !loading &&
			  <Card.Group stackable itemsPerRow={2} className="ticket-group" >
				  { data.ver_tickets.length > 0
				  	? data.ver_tickets.map((ticket, idx) => <Ticket ticket={ticket} key={idx} />)
				  	: <Card header="Aún no tienes tickets :(" />
				  }
				</Card.Group>
			}
    </Segment>
	);
}

export default function Home(props) {
	const { user } = useContext(AuthContext);

	return user ? <UserHome /> : <h1>Bienvenido</h1>;
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