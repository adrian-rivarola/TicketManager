import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

export default function Register(props) {
  const context = useContext(AuthContext);

  const { values, onSubmit, onChange } = useForm(registerCB, {
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState([]);

  const [addUser, { loading }] = useMutation(REGISTER_MUTATION, {
    update(_, { data: { register: userData }}) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      const errores = err.graphQLErrors[0].extensions.exception.errors;
      values.password = '';
      values.confirmPassword = '';
      setErrors(Object.values(errores));
    },
    variables: values
  })

  function registerCB() {
    addUser();
  }

  return (
    <div className="ui segment raised padded">
      <h1>Registrarse</h1>
      { errors.length > 0 &&
        <div className="ui error message">
          <ul className="list">
            { errors.map(err => <li key={err}> {err} </li>) }
          </ul>
        </div>
      }
      <Form onSubmit={onSubmit} loading={loading} >
        <Form.Input
          type="text"
          label="Nombre de usuario:"
          name="username"
          value={ values.username }
          onChange={onChange}
          required
        />
        <Form.Input
          label="Contraseña:"
          type="password"
          name="password"
          value={ values.password }
          onChange={onChange}
          required
        />
        <Form.Input
          label="Confirmar contraseña:"
          type="password"
          name="confirmPassword"
          value={ values.confirmPassword }
          onChange={onChange}
          required
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