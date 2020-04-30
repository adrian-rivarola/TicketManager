import React from 'react';
import { Segment, Form, Divider, Header, Icon, Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/react-hooks'; 
import { useForm } from '../util/hooks';
import gql from 'graphql-tag';

export default function CrearEvento(props) {
	
	const { values, onChange, onSubmit } = useForm(createEventCallback, {
		name: '',
		description: '',
		location: '',
		date: ''
	});

	const [createEvent, { loading }] = useMutation(CREAR_EVENTO, {
		update(_, {data: { crear_evento }}) {
			props.history.push('/mi-eventos');
		},
		onError(err) {
			alert(JSON.stringify(err));
		},
		variables: {eventInput: { ...values }}
	})

	function createEventCallback() {
		createEvent();
	}


	return (
		<Segment raised padded loading={loading}>
			<Divider horizontal>
		    <Header as='h4'>
		      <Icon name='announcement' />
		      Crear evento
		    </Header>
		  </Divider>
			<Form onSubmit={onSubmit} noValidate className="event-form">
				<Form.Input
					type="text"
					label="Nombre:"
					name="name"
					value={ values.name }
					onChange={onChange}
				/>
				<Form.Input
					type="text"
					label="Descripción:"
					name="description"
					value={ values.description }
					onChange={onChange}
				/>
				<Form.Input
					type="date"
					label="Fecha:"
					name="date"
					value={ values.date }
					onChange={onChange}
				/>
				<Form.Input
					type="text"
					label="Lugar:"
					name="location"
					value={ values.location }
					onChange={onChange}
				/>
				<Button type="submit" color="teal" >
					Crear
				</Button>
			</Form>
		</Segment>
	);
} 

const CREAR_EVENTO = gql`
	mutation crear_evento( $eventInput: EventInput! ) 
	{
		crear_evento(eventInput: $eventInput)
		{
			id
	    name
	    description
	    location
	    date
		}
	}
`;