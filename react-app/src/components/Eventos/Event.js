import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

function Event({ item: event, activateModal, className }) {

  return (
    <Card raised centered color="teal" className={className} >
      <Card.Content header={event.name}  />
      <Card.Content description={event.description} />
      <Card.Content >
        <Button
          icon="ticket"
          content="Enviar Ticket"
          color="blue" 
          basic
          onClick={activateModal} />
        <Button
          icon="qrcode"
          content="Escanear Tickets"
          color="blue"
          basic
          as={Link}
          to="/eventos/verificar" />
      </Card.Content>
    </Card>
  );
}

export default React.memo(Event);