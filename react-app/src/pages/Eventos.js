import React, { Suspense } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Header from '../components/Header';

const ListaEventos = React.lazy(() => import('../components/Eventos/ListaEventos' /* webpackChunkName: "events" */)),
			EventForm = React.lazy(() => import('../components/Eventos/EventForm' /* webpackChunkName: "events" */)),
		  LectorQR = React.lazy(() => import('../components/LectorQR' /* webpackChunkName: "events" */))

const Eventos = props => {

	return (
		<Switch>

			<Route exact path='/eventos' >
				<Suspense fallback={<Header titulo='events.title' icono="group" loading />}>
					<ListaEventos />
				</Suspense>
			</Route>
			
			<Route path='/eventos/nuevo' >
				<Suspense fallback={<Header titulo='events.new' icono="group" loading />} >
					<EventForm />
				</Suspense>
			</Route>

			<Route path='/eventos/verificar' >
				<Suspense fallback={<Header titulo='scanner.title' icono="qrcode" loading />} >
					<LectorQR />
				</Suspense>
			</Route>
		</Switch>
	);
}

export default Eventos;
