import React, { Suspense } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import Header from '../components/Header';
import ListaEventos from '../components/Eventos/ListaEventos';

const EventForm = React.lazy(() => import('../components/Eventos/EventForm' /* webpackChunkName: "events" */)),
		  LectorQR = React.lazy(() => import('../components/LectorQR' /* webpackChunkName: "events" */))

const Eventos = props => {

	return (
		<Suspense fallback={<Header titulo='events.title' icono="group" loading />}>
			<Switch>
				<Route exact path='/events' component={ListaEventos} />
				<Route path='/events/scan' component={LectorQR} />
				<Route path='/events/new' component={EventForm} />
			</Switch>
		</Suspense>
	);
}

export default Eventos;
