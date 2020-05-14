import React from 'react';

import { Icon, Card } from 'semantic-ui-react';

function Ticket({ showQR, className, ticket: { id, event } }) {
  return (
    <Card
      raised
      centered
      className={className}
      color="blue"
      onClick={showQR}
    >
      <Card.Content header={event.name} />
      <Card.Content extra>
        <Icon name='calendar alternate outline' />{event.date}
      </Card.Content>
    </Card>
  );
}

export default React.memo(Ticket);