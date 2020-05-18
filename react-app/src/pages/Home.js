import React, { useContext, Suspense } from 'react';

import { Segment } from 'semantic-ui-react';
import Loader from '../components/Loader';
import Header from '../components/Header';

import { AuthContext } from '../context/auth';

const ListaTickets = React.lazy(() => import('../components/ListaTickets'));

export default function Home(props) {
  const { user, logout } = useContext(AuthContext);

  return user
    ? <Suspense fallback={<Loader titulo="Mis Tickets" icono="ticket" />}>
        <ListaTickets logout={logout} />
      </Suspense>
    : HomePage
}

const HomePage = (
  <Segment raised padded>
    <Header titulo="Inicio" icono="home" />
        
  </Segment>
);