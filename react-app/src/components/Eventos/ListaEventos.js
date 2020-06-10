import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import gql from 'graphql-tag';

import { Segment, Button } from 'semantic-ui-react';
import Header from '../Header';

import TicketForm from '../Tickets/TicketForm';
import ListaItems from '../ListaItems';
import Event from './Event';

function ListaEventos(props) {
  return (
    <Segment color='teal' className='fh' attached>
      <Header titulo='events.title' icono='group' />
      <ListaItems
        itemName='events'
        itemComponent={Event}
        query={GET_EVENTS_QUERY}
        modalComponent={TicketForm}
        modalHeader='ticket.send'
      />
      <Segment textAlign="center" basic>
        <Button
          icon='plus'
          color='teal'
          content={ <FormattedMessage id='events.new' /> }
          disabled={!navigator.onLine}
          as={Link}
          to='/eventos/nuevo'
        />
      </Segment>
    </Segment>
  );
}

export const GET_EVENTS_QUERY = gql`
  {
    events {
      id
      name
      description
      date
      location
    }
  }
`;

export default React.memo(ListaEventos);