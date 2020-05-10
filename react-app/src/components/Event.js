import React, { useState } from 'react';

import { Modal, Button, Card } from 'semantic-ui-react';

import TicketForm from './TicketForm';

export default function Event({ event }) {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState('')
  
  const closeModal = () => {
    setModalContent('');
    setOpen(false);
  }
  const openModal = (content) => {
    setModalContent(content)
    setOpen(true);
  }

  return (
    <Card raised>
      <Card.Content header={event.name}  />
      <Card.Content description={event.description} />
      <Card.Content textAlign="center">
        <Button 
          icon="info" 
          content="Información" 
          color="blue"
          onClick={() => openModal('i') } />
        <Button 
          icon="group"
          content="Participantes"
          color="olive" 
          onClick={() => openModal('p')} />
      </Card.Content>
      <EventModal
        closeModal={closeModal}
        open={open}
        event={event}>
        { modalContent === 'p' && <TicketForm event={event} /> }
        { modalContent === 'i' && <h4>Info</h4> }
      </EventModal>
    </Card>
  );
}

const EventModal = ({ children, open, closeModal }) => (
  <Modal
    size="tiny"
    open={open}
    onClose={closeModal} 
  >
    <Modal.Content>
      { children }
    </Modal.Content>
  </Modal>
);