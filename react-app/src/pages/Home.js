import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

import { Segment, Divider, Header, Icon, Card } from 'semantic-ui-react';
import Ticket from '../components/Ticket';

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
		<Segment raised loading={loading}>
			<Divider horizontal>
		    <Header as='h4'>
		      <Icon name='ticket' />
		      Mis tickets
		    </Header>
		  </Divider>
		  { tickets.length > 0 &&
	      <Card.Group stackable itemsPerRow={tickets.length === 1 ? 1:2} className="ticket-group">
	        { tickets.map((ticket, idx) =>  <Ticket ticket={ticket} key={idx} className={tickets.length === 1 ? 'card500':''}/>) }
	      </Card.Group>
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