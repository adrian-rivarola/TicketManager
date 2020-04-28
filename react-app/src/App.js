import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { Container } from 'semantic-ui-react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
	return (
		<Router>
    	<Container>
	    	<Route exact path='/' component={Home} />
	    	<Route exact path='/login' component={Login} />
	    	<Route exact path='/register' component={Register} />
	    </Container>
    </Router>
	);
}