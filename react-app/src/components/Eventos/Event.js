import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Card } from 'semantic-ui-react';

function Event({ item: event, activateModal, className }) {

  return (
    <Card raised centered color="teal" className={className} >
      <Card.Content header={event.name}  />
      <Card.Content description={event.description} />
      <Card.Content >
        <Button
          basic
          color="blue"
          icon="ticket"
          content={ <FormattedMessage id='ticket.send' /> }
          disabled={!navigator.onLine}
          onClick={activateModal} 
          as={Link}
          to="#send"
        />
        <Button
          basic
          color="blue"
          icon="qrcode"
          content={ <FormattedMessage id='ticket.scan' /> }
          disabled={!navigator.onLine}
          as={Link}
          to="/eventos/verificar" />
      </Card.Content>
    </Card>
  );
}

export default React.memo(Event);