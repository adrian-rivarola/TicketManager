import React, { useContext, Suspense } from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';

import { AuthContext } from '../context/auth';

const ListaTickets = React.lazy(() => import('../components/Tickets/ListaTickets'));

export default function Home(props) {
  const { user, logout } = useContext(AuthContext);

  return user
    ? <Suspense fallback={<Header titulo="tickets.title" icono="ticket" loading />}>
        <ListaTickets logout={logout} />
      </Suspense>
    : <Redirect to='/login' replace />
}