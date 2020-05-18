import React, { useContext, Suspense } from 'react';

import { Segment, Divider, Header, Icon } from 'semantic-ui-react';
import Loader from '../components/Loader';

import { AuthContext } from '../context/auth';

const ListaTickets = React.lazy(() => import('../components/ListaTickets'));

export default function Home(props) {
  const { user, logout } = useContext(AuthContext);

  return user
    ? <Suspense fallback={<Loader titulo="Mis Tickets" icon="ticket" />}>
        <ListaTickets logout={logout} />
      </Suspense>
    : HomePage
}

const HomePage = (
  <Segment raised padded>
    <Divider horizontal>
      <Header as="h4">
        <Icon name="home" />
        Inicio
      </Header>
    </Divider>
  </Segment>
);