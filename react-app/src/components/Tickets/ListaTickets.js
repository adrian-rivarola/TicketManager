import React from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment } from 'semantic-ui-react';
import Header from '../Header';

import ListaItems from '../ListaItems';
import TicketQR from './TicketQR';
import Ticket from './Ticket';

function ListaTickets({ logout }) {
  const {
    loading,
    data,
    error
  } = useQuery(GET_TICKETS_QUERY);

  if (error){
    logout();
    alert('Algo salio mal, vuelve a iniciar sesión');
    return <Redirect to="/login" />
  }

  return (
    <Segment stacked color="blue" loading={loading}>
      <Header titulo='tickets.title' icono='ticket' />
      { data && (
        data.ver_tickets.length > 0
        ? <ListaItems 
            items={data.ver_tickets}
            itemComponent={Ticket}
            modalHeader="Ticket"
            modalComponent={TicketQR}
            sendActiveItemAs='ticket'
          />
        : <Segment padded textAlign="center" className="no-items">
            <p>
              <FormattedMessage id='tickets.empty' />
            </p>
          </Segment>
      )}
    </Segment>
  );
}

const GET_TICKETS_QUERY = gql`
  {
    ver_tickets {
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

export default React.memo(ListaTickets);