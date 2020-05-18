import React, { useContext, Suspense } from 'react';

import { Segment } from 'semantic-ui-react';
import Header from '../components/Header';

import { AuthContext } from '../context/auth';

const ListaTickets = React.lazy(() => import('../components/Tickets/ListaTickets'));

export default function Home(props) {
  const { user, logout } = useContext(AuthContext);

  return user
    ? <Suspense fallback={<Header titulo="Mis Tickets" icono="ticket" loading />}>
        <ListaTickets logout={logout} />
      </Suspense>
    : HomePage
}

const HomePage = (
  <Segment raised padded>
    <Header titulo="Inicio" icono="home" />
        
  </Segment>
);