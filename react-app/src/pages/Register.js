import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

export default function Register(props) {

	const [errors, setErrors] = useState([]);
	const { values, onSubmit, onChange } = useForm(registerCB, {
		username: '',
		password: '',
		confirmPassword: ''
	});

	const [addUser, { loading }] = useMutation(REGISTER_MUTATION, {
		update(_, result) {
			console.log(result);
			props.history.push('/');
		},
		onError(err) {
			console.error(err);
		},
		variables: values
	})

	function registerCB() {
		addUser();
	}

	return (
		<div>
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading':''} >
				<h1>Registrarse</h1>
				<br />
				<Form.Input
					type="text"
					label="Nombre de usuario:"
					name="username"
					value={ values.username }
					onChange={onChange}
				/>
				<Form.Input
					label="Contraseña:"
					type="password"
					name="password"
					value={ values.password }
					onChange={onChange}
				/>
				<Form.Input
					label="Confirmar contraseña:"
					type="password"
					name="confirmPassword"
					value={ values.confirmPassword }
					onChange={onChange}
				/>
				<Button type="submit" color="teal" >
					Registrarse
				</Button>
			</Form>
		</div>
	);
}

const REGISTER_MUTATION = gql`
	mutation register(
		$password: String!
		$username: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id username authToken
		}
	}
`;