import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';

import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';

const NuevoEvento = React.lazy(() => import('./pages/NuevoEvento')),
      ListaEventos = React.lazy(() => import('./pages/ListaEventos')),
      VerificarTicket = React.lazy(() => import('./pages/VerificarTicket'))

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/" component={MenuBar} />
        <Route exact path='/' component={Home} />

        <Suspense fallback={ <Loader titulo="Mis Eventos" icon="group" /> }>
          <Route exact path='/mis-eventos' component={ListaEventos} />
          <Route exact path='/mis-eventos/nuevo' component={NuevoEvento} />
        </Suspense>

        <Suspense fallback={ <Loader titulo="VerificarTicket" icon="qrcode" /> }>
          <Route exact path='/verificar-ticket' component={VerificarTicket} />
        </Suspense>

        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />

      </Router>
     </AuthProvider>
  );
}

const Loader = props => (
  <div className="ui loading raised segment">
    <div className="ui horizontal divider">
      <h4 className="ui header">
        <i aria-hidden="true" className={`${props.icon} icon`}></i>
        {props.titulo}
      </h4>
    </div>
  </div>
);
