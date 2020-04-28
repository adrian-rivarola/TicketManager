import React, { useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

export default function Login(props) {
	const context = useContext(AuthContext);

	const { values, onSubmit, onChange } = useForm(loginCB, {
		username: '',
		password: '',
		confirmPassword: ''
	});

	const [addUser, { loading }] = useMutation(LOGIN_MUTATION, {
		update(_, { data: { login: userData }}) {
			context.login(userData);
			props.history.push('/');
		},
		onError(err) {
			alert(JSON.stringify(err));
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
			id username authToken tickets { id }
		}
	}
`;