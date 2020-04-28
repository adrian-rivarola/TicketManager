import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

export default function Register(props) {

	const [errors, setErrors] = useState([]);
	const { values, onSubmit, onChange } = useForm(loginCB, {
		username: '',
		password: '',
		confirmPassword: ''
	});

	const [addUser, { loading }] = useMutation(LOGIN_MUTATION, {
		update(_, result) {
			console.log(result);
			props.history.push('/');
		},
		onError(err) {
			console.error(err);
		},
		variables: values
	})

	function loginCB() {
		addUser();
	}

	return (
		<div>
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading':''} >
				<h1>Acceder</h1>
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
				<Button type="submit" color="teal" >
					Log in
				</Button>
			</Form>
		</div>
	);
}

const LOGIN_MUTATION = gql`
	mutation login(
		$username: String!
		$password: String!
	) {
		login(
			username: $username
			password: $password
		) {
			id username authToken
		}
	}
`;