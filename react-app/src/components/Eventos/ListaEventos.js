import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Segment, Button } from 'semantic-ui-react';
import Header from '../Header';

import { useLocalStorage } from '../../util/hooks';

import TicketForm from '../Tickets/TicketForm';
import ListaItems from '../ListaItems';
import Event from './Event';

function ListaEventos(props) {
  const [events, setEvents] = useLocalStorage('events');
  const {
    loading,
    data,
    error
  } = useQuery(GET_EVENTS_QUERY);

  useEffect(() => {
    if (data !== undefined) {
      setEvents(data['ver_eventos']);
    }
  }, [data, setEvents]);

  if (error && navigator.onLine)
    return <Redirect to="/" />

  return (
    <Segment color="teal" className='fh' attached>
      <Header titulo='events.title' icono='group' />
      { events && (
        events.length > 0
        ? <ListaItems 
            items={events}
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
      { !loading || !navigator.onLine 
        ? <Segment textAlign="center" basic>
            <Button
              icon="plus"
              color="teal"
              content={ <FormattedMessage id='events.new' /> }
              disabled={!navigator.onLine}
              title="asd"
              as={Link}
              to="/eventos/nuevo"
            />
          </Segment>
        : <div className="ui active centered inline loader"></div>
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