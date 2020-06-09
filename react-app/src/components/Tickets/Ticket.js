import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, Card } from 'semantic-ui-react';

function Ticket({ activateModal, className, item: { id, event } }) {
  return (
    <Card
      raised
      centered
      color="blue"
      className={className}
      onClick={activateModal}
      as={Link}
      to="#ticket"
    >
      <Card.Content header={event.name} />
      <Card.Content extra>
        <Icon name='calendar alternate outline' />{event.date}
      </Card.Content>
    </Card>
  );
}

export default React.memo(Ticket);