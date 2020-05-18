import React from 'react';

import { Icon, Card } from 'semantic-ui-react';

function Ticket({ activateModal, className, item: { id, event } }) {
  return (
    <Card
      raised
      centered
      className={className}
      color="blue"
      onClick={activateModal}
    >
      <Card.Content header={event.name} />
      <Card.Content extra>
        <Icon name='calendar alternate outline' />{event.date}
      </Card.Content>
    </Card>
  );
}

export default React.memo(Ticket);