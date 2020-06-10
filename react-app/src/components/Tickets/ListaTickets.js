import React from 'react';

import { Segment } from 'semantic-ui-react';
import Header from '../Header';

import ListaItems from '../ListaItems';
import TicketQR from './TicketQR';
import Ticket from './Ticket';

import gql from 'graphql-tag';

export default function ListaTickets(props) {
  return (
    <Segment color='blue' className='fh' attached>
      <Header titulo='tickets.title' icono='ticket' />
      <ListaItems
        itemName='tickets'
        itemComponent={Ticket}
        modalComponent={TicketQR}
        modalHeader='Ticket'
        query={GET_TICKETS_QUERY}
      />
    </Segment>
  );
}

const GET_TICKETS_QUERY = gql`
  {
    tickets {
      id
      event {
        id
        name
        description
        date
        location
      }
      isValid
    }
  }
`;
