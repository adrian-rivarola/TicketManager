import React, { useState, useContext, useRef } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import ListaErrores from '../components/ListaErrores';

import { FormattedMessage } from 'react-intl';

export default function Register(props) {
  const context = useContext(AuthContext);

  const { values, onSubmit, onChange } = useForm(registerCB, {
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState([]);
  const inpRef = useRef(null);

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
      inpRef.current.focus();
    },
    variables: values
  })

  function registerCB() {
    addUser();
  }

  return (
    <div className="ui segment raised padded fh">
      <h2 className="ui horizontal divider header">
        <FormattedMessage id='register' />
      </h2>
      { errors.length > 0 && <ListaErrores errors={errors} /> }
      <Form onSubmit={onSubmit} loading={loading} className="user-form" >
        <div className="required field">
          <label>
            <FormattedMessage id='username' />
          </label>
          <input 
            type="text" 
            name="username" 
            value={values.username}
            onChange={onChange}
            ref={inpRef}
            required />
        </div>
        <div className="required field">
          <label>
            <FormattedMessage id='password' />
          </label>
          <input 
            type="password" 
            name="password" 
            value={values.password}
            onChange={onChange}
            required />
        </div>
        <div className="required field">
          <label>
            <FormattedMessage id='confirmPass' />
          </label>
          <input  
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <Button type="submit" color="teal" fluid >
          <FormattedMessage id='register' />
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