import React, { Suspense } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Header from '../components/Header';

const ListaEventos = React.lazy(() => import('../components/Eventos/ListaEventos' /* webpackChunkName: "events" */)),
		  VerificarTicket = React.lazy(() => import('../components/Tickets/VerificarTicket')),
			EventForm = React.lazy(() => import('../components/Eventos/EventForm'))

const Eventos = props => {

	return (
		<Switch>

			<Route exact path='/eventos' >
				<Suspense fallback={<Header titulo='Mis Eventos' icono="group" loading />}>
					<ListaEventos />
				</Suspense>
			</Route>
			
			<Route path='/eventos/nuevo' >
				<Suspense fallback={<Header titulo='Crear Evento' icono="group" loading />} >
					<EventForm />
				</Suspense>
			</Route>

			<Route path='/eventos/verificar' >
				<Suspense fallback={<Header titulo='Verificar Ticket' icono="qrcode" loading />} >
					<VerificarTicket />
				</Suspense>
			</Route>
		</Switch>
	);
}

export default Eventos;
