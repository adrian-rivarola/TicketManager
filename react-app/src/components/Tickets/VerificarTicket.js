import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

import { Segment, Card, Button } from 'semantic-ui-react';
import Header from '../Header';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function VerificarTicket(props) {
	const [ticketId, setTicketId] = useState('');
	const [results, setResults] = useState('');

	const [validar_ticket, { loading }] = useMutation(VALIDAR_TICKET_MUTATION, {
		update(_, { data: { validar_ticket }}) {
			setResults(validar_ticket);
		},
		onError(err) {
			alert(JSON.stringify(err))
		},
		variables: {id: ticketId}
	})

	const handleScan = data => {
		if (!data) return;
		setTicketId(data);
		validar_ticket();
	}

	return (
		<Segment raised loading={loading}>
		  <Header titulo="Verificar Ticket" icono='qrcode' />
		  <div className="ticket-scanner">
		  	{ !results
		  		? <QrReader
		          delay={300}
		          onError={err => alert(JSON.stringify(err)) }
		          onScan={handleScan}
		        />
		      : <Card fluid>
					    <Card.Content header={results.event.name}  />
					    <Card.Content description={`Este ticket pertenece a ${results.owner.username}`} />
					    <Card.Content extra>
					      <Button color="teal" basic onClick={ev => setResults('')}>
					      	Volver a escanear
					      </Button>
					    </Card.Content>
				  </Card>
      	}
		  </div>
		</Segment>
	);
}

const VALIDAR_TICKET_MUTATION = gql`
	mutation($id:ID!) {
		validar_ticket(id: $id) {
			id
			event {
				id
				name
				description
				date
				location
			}
			owner {
				id
				username
			}
		}
	}
`;

export default React.memo(VerificarTicket);