import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { IntlProvider } from "react-intl";

import { AuthProvider } from './context/auth';
import { PublicRoute, PrivateRoute } from './util/AuthRoute';
import { useLocalStorage } from './util/hooks';

import messages from './messages';

import MenuBar from './components/MenuBar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Eventos from './pages/Eventos';

import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const defaultLang = navigator.language || navigator.userLanguage;
  const [locale, setLocale] = useLocalStorage('lang', defaultLang.substr(0, 2));

  return (
    <AuthProvider>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Router>
          <Route path="/">
            <MenuBar setLocale={setLocale} />
          </Route>
          <Route exact path='/' component={Home} />

          <PrivateRoute path='/events' component={Eventos} />

          <PublicRoute exact path='/login' component={Login} restricted />
          <PublicRoute exact path='/register' component={Register} restricted />

        </Router>
        <Footer />
      </IntlProvider>
    </AuthProvider>
  );
}