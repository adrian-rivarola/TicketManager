import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

export default function Login(props) {
  const context = useContext(AuthContext);
  
  const { values, onSubmit, onChange } = useForm(loginCB, {
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);

  const [addUser, { loading }] = useMutation(LOGIN_MUTATION, {
    update(_, { data: { login: userData }}) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      const errores = err.graphQLErrors[0].extensions.exception.errors;
      values.password = '';
      setErrors(Object.values(errores));
    },
    variables: values
  })

  function loginCB() {
    addUser();
  }

  return (
    <div className="ui segment raised padded">
      <h1>Acceder</h1>
      <br />
      { errors.length > 0 &&
        <div className="ui error message">
          <ul className="list">
            { 
              errors.map(err => <li key={err}> {err} </li> )
            }
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