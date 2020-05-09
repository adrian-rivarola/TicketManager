import React, { useState, useContext, useRef } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import ListaErrores from '../components/ListaErrores';

export default function Login(props) {
  const context = useContext(AuthContext);
  
  const { values, onSubmit, onChange } = useForm(loginCB, {
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const inpRef = useRef(null);

  const [addUser, { loading }] = useMutation(LOGIN_MUTATION, {
    update(_, { data: { login: userData }}) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      const errores = err.graphQLErrors[0].extensions.exception.errors;
      values.password = '';
      setErrors(Object.values(errores));
      inpRef.current.focus();
    },
    variables: values
  })

  function loginCB() {
    addUser();
  }

  return (
    <div className="ui segment raised padded">
      <h2 className="ui horizontal divider header">
        Acceder
      </h2>
      { errors.length > 0 && <ListaErrores errors={errors} /> }
      <Form onSubmit={onSubmit} loading={loading} className="user-form" >
        <div className="required field">
          <label>Nombre de usuario:</label>
          <input 
            type="text" 
            name="username" 
            value={values.username}
            onChange={onChange}
            ref={inpRef}
            required />
        </div>
        <div className="required field">
          <label>Contraseña:</label>
          <input 
            type="password"
            name="password"
            value={ values.password }
            onChange={onChange}
            required />
        </div>
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