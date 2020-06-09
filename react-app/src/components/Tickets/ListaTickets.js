import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment } from 'semantic-ui-react';
import Header from '../Header';

import { useLocalStorage } from '../../util/hooks';

import ListaItems from '../ListaItems';
import TicketQR from './TicketQR';
import Ticket from './Ticket';

function ListaTickets({ logout }) {
  const [tickets, setTickets] = useLocalStorage('tickets');
  const {
    loading,
    data,
    error
  } = useQuery(GET_TICKETS_QUERY);

  useEffect(() => {
    if (data !== undefined) {
      setTickets(data['ver_tickets']);
    }
  }, [data, setTickets]);

  if (error && navigator.onLine) {
    logout();
    alert('Algo salio mal, vuelve a iniciar sesión');
    return <Redirect to="/login" />
  }

  return (
    <Segment color="blue" className='fh' attached>
      <Header titulo='tickets.title' icono='ticket' />
      { tickets && (
        tickets.length > 0
        ? <ListaItems 
            items={tickets}
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
      { loading && navigator.onLine && !error &&
        <div className="ui active centered inline loader"></div>
      }
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