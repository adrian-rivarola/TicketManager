import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { AuthProvider } from './context/auth';
import { PublicRoute, PrivateRoute } from './util/AuthRoute';

import MenuBar from './components/MenuBar';

import Home from './pages/Home';
import Eventos from './pages/Eventos';

import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={MenuBar} />
        <Route exact path='/' component={Home} />

        <PrivateRoute path='/eventos' component={Eventos} />

        <PublicRoute exact path='/login' component={Login} restricted />
        <PublicRoute exact path='/register' component={Register} restricted />

      </Router>
     </AuthProvider>
  );
}