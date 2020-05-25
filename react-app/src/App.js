import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { IntlProvider } from "react-intl";

import { AuthProvider } from './context/auth';
import { PublicRoute, PrivateRoute } from './util/AuthRoute';

import messages from './messages';

import MenuBar from './components/MenuBar';

import Home from './pages/Home';
import Eventos from './pages/Eventos';

import Login from './pages/Login';
import Register from './pages/Register';

import './App.css';

export default function App() {
  const [locale] = useState('en');

  return (
    <AuthProvider>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Router>
          <Route path="/" component={MenuBar} />
          <Route exact path='/' component={Home} />

          <PrivateRoute path='/eventos' component={Eventos} />

          <PublicRoute exact path='/login' component={Login} restricted />
          <PublicRoute exact path='/register' component={Register} restricted />

        </Router>
      </IntlProvider>
    </AuthProvider>
  );
}