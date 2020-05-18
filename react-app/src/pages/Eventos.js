import React, { Suspense } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Loader from '../components/Loader';

const ListaEventos = React.lazy(() => import('../components/ListaEventos' /* webpackChunkName: "events" */)),
		  VerificarTicket = React.lazy(() => import('../components/VerificarTicket')),
			EventForm = React.lazy(() => import('../components/EventForm'))

const Eventos = props => {

	return (
		<Switch>

			<Route exact path='/eventos' >
				<Suspense fallback={<Loader titulo='Mis Eventos' icon="group" />}>
					<ListaEventos />
				</Suspense>
			</Route>
			
			<Route path='/eventos/nuevo' >
				<Suspense fallback={<Loader titulo='Crear Evento' icon="group" />} >
					<EventForm />
				</Suspense>
			</Route>

			<Route path='/eventos/verificar' >
				<Suspense fallback={<Loader titulo='Verificar Ticket' icon="qrcode" />} >
					<VerificarTicket />
				</Suspense>
			</Route>
		</Switch>
	);
}

export default Eventos;
