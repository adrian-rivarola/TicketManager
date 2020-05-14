import React from 'react';

import { Button, Card } from 'semantic-ui-react';

function Event({ event, sendTicket, className }) {

  return (
    <Card raised centered className={className} >
      <Card.Content header={event.name}  />
      <Card.Content description={event.description} />
      <Card.Content >
        <Button
          icon="ticket"
          content="Enviar Ticket"
          color="blue"
          onClick={sendTicket} />
      </Card.Content>
    </Card>
  );
}

export default React.memo(Event);