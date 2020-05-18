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
				<Suspense fallback={<Loader titulo='Mis Eventos' icono="group" />}>
					<ListaEventos />
				</Suspense>
			</Route>
			
			<Route path='/eventos/nuevo' >
				<Suspense fallback={<Loader titulo='Crear Evento' icono="group" />} >
					<EventForm />
				</Suspense>
			</Route>

			<Route path='/eventos/verificar' >
				<Suspense fallback={<Loader titulo='Verificar Ticket' icono="qrcode" />} >
					<VerificarTicket />
				</Suspense>
			</Route>
		</Switch>
	);
}

export default Eventos;
