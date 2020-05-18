import React from 'react';
import { Link } from 'react-router-dom';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'; 
import { GET_EVENTS_QUERY } from './ListaEventos';
import { useForm } from '../util/hooks';

import { Form, Segment, Button } from 'semantic-ui-react';
import Header from './Header'; 

function NuevoEvento(props) {
	const { values, onChange, onSubmit } = useForm(createEventCallback, {
		name: '',
		description: '',
		location: '',
		date: ''
	});

	const [createEvent, { loading }] = useMutation(CREAR_EVENTO, {
		update(proxy, {data: { crear_evento }}) {
			const data = proxy.readQuery({
        query: GET_EVENTS_QUERY
      });
			data.ver_eventos = [crear_evento, ...data.ver_eventos];
			proxy.writeQuery({ query: GET_EVENTS_QUERY, data });
			
			props.history.push('/mis-eventos');
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
		<Segment raised padded>
			<Header titulo="Crear evento" icono="group" />
			<Form onSubmit={onSubmit} loading={loading} className="event-form">
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
				<Button as={Link} to="/eventos" replace>
					Volver
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

export default React.memo(NuevoEvento);