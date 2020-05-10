import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks'; 

import { Form, Message, Divider, Header, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

function TicketForm({ event }) {
	const { values, onChange, onSubmit } = useForm(createTicketCallback, { owner: '' });
	const [message, setMessage] = useState({
		content: "",
		positive: true
	});

	const inpRef = useRef(null);

	const [createTicket, { loading }] = useMutation(CREAR_TICKET, {
		update(_, {data: { crear_ticket: { owner } }}) {
			if (owner) {
				setMessage({
					content: `Ticket enviado a ${owner.username}`,
					positive: true,
				});
				values.owner = '';
			}

		},
		onError(err) {
			setMessage({
				content: err["graphQLErrors"][0].message,
				negative: true
			});
			inpRef.current.focus();
		},
		variables: {ticketInput: { owner: values.owner, event: event.id }}
	})

	function createTicketCallback() {
		createTicket();
	}

	return (
		<Form onSubmit={onSubmit} loading={loading} className="ticket-form">
			<Divider horizontal>
		    <Header as="h4">
		      Enviar Ticket
		    </Header>
		  </Divider>
		  { message.content && 
        <Message
          size="small"
          {...message}
          className="event-msg"
          onDismiss={() => setMessage({content: ''})} /> 
      }
				<div className="required field">
          <label>Nombre de usuario:</label>
          <input 
            type="text" 
            name="owner" 
            value={values.owner}
            onChange={onChange}
            ref={inpRef}
            required />
        </div>
				<Button type="submit" color="teal" >
					Enviar
				</Button>
		</Form>
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

export default React.memo(TicketForm);