import React from 'react';
import { useMutation } from '@apollo/react-hooks'; 

import { Segment, Divider, Header, Icon, Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

export default function TicketForm({ event }) {
	const { values, onChange, onSubmit } = useForm(createTicketCallback, { owner: '' });
	
	const [createTicket, { loading }] = useMutation(CREAR_TICKET, {
		update(_, {data: { crear_ticket: { owner } }}) {
			if (owner) {
				alert(`Ticket enviado a ${owner.username}`);
			}
		},
		onError(err) {
			alert(err["graphQLErrors"][0].message);
		},
		variables: {ticketInput: { owner: values.owner, event: event.id }}
	})

	function createTicketCallback() {
		createTicket();
	}
	return (
		<Segment raised padded loading={loading}>
			<Divider horizontal>
		    <Header as='h4'>
		      <Icon name='announcement' />
		      Enviar Ticket
		    </Header>
		  </Divider>
			<Form onSubmit={onSubmit} noValidate className="ticket-form">
				<Form.Input
					type="text"
					label="Nombre de usuario:"
					name="owner"
					value={values.name}
					onChange={onChange}
				/>
				<Button type="submit" color="teal" >
					Crear
				</Button>
			</Form>
		</Segment>
	);
}

const CREAR_TICKET = gql`
	mutation crear_ticket( $ticketInput: TicketInput! ) 
	{
		crear_ticket(ticketInput: $ticketInput)
		{
			id
			owner {
				username
			}
		}
	}
`;