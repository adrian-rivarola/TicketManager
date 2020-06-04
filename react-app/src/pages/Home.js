import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

import ListaTickets from '../components/Tickets/ListaTickets';

export default function Home(props) {
  const { user, logout } = useContext(AuthContext);

  return user
    ? <ListaTickets logout={logout} />
    : <Redirect to='/login' replace />
}