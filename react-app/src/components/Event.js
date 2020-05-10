import React, { useState } from 'react';

import { Modal, Button, Card } from 'semantic-ui-react';

import TicketForm from './TicketForm';

function Event({ event }) {
  const [open, setOpen] = useState(false);
  
  const closeModal = () => setOpen(false);
  const openModal = (content) => setOpen(true);

  return (
    <Card raised>
      <Card.Content header={event.name}  />
      <Card.Content description={event.description} />
      <Card.Content >
        <Button
          icon="ticket"
          content="Enviar Ticket"
          color="blue"
          onClick={() => openModal('p')} />
      </Card.Content>
      <Modal
        size="tiny"
        open={open}
        onClose={closeModal} 
        closeIcon >
        <TicketForm event={event} />
      </Modal>
    </Card>
  );
}

export default React.memo(Event);