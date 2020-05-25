import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Divider, Button } from 'semantic-ui-react';
import Header from '../Header';
import TicketForm from '../Tickets/TicketForm';
import ListaItems from '../ListaItems';
import Event from './Event';

function ListaEventos(props) {
  const {
    loading,
    data,
    error
  } = useQuery(GET_EVENTS_QUERY);

  if (error)
    return <Redirect to="/" />

  return (
    <Segment raised color="teal" loading={loading}>
      <Header titulo='events.title' icono='group' />
      { data && (
        data.ver_eventos.length > 0
        ? <ListaItems 
            items={data.ver_eventos}
            itemComponent={Event}
            modalHeader={ <FormattedMessage id='ticket.send' /> }
            modalComponent={TicketForm}
            sendActiveItemAs='event'
          />
        : <Segment padded textAlign="center" className="no-items">
            <p>
              <FormattedMessage id='events.empty' />
            </p>
          </Segment>
      )}
      { !loading && 
        <Divider horizontal>
          <Button
            icon="plus"
            color="teal"
            content={ <FormattedMessage id='events.new' /> }
            as={Link}
            to="/eventos/nuevo"
            replace
          />
        </Divider>
      }
    </Segment>
  );
}

export const GET_EVENTS_QUERY = gql`
  {
    ver_eventos {
      id
      name
      description
      date
      location
    }
  }
`;

export default React.memo(ListaEventos);