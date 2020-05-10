import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import { Container } from 'semantic-ui-react';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListaEventos from './pages/ListaEventos';
import NuevoEvento from './pages/NuevoEvento';
import VerificarTicket from './pages/VerificarTicket';

export default function App() {
	return (
		<AuthProvider>
			<Router>
	    	<Container>
	    		<Route path='/' component={MenuBar} />
		    	<Route exact path='/' component={Home} />
		    	<Route exact path='/mis-eventos' component={ListaEventos} />
		    	<Route exact path='/mis-eventos/nuevo' component={NuevoEvento} />
		    	<Route exact path='/verificar-ticket' component={VerificarTicket} />
		    	<AuthRoute exact path='/login' component={Login} />
		    	<AuthRoute exact path='/register' component={Register} />
		    </Container>
	    </Router>
	   </AuthProvider>
	);
}