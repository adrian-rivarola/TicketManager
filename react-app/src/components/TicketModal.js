import React from 'react';

import { Modal } from 'semantic-ui-react';

export default function TicketModal({ open, onClose, ticket }) {

  return (
    <Modal
      open={open}
      size="tiny"
      onClose={onClose}
      closeIcon
    >
      { ticket && 
        <React.Fragment>
          <Modal.Header>
            {`Ticket para '${ticket.event.name}'`}
          </Modal.Header>
          <Modal.Content>
            
          </Modal.Content>
        </React.Fragment>
      }
    </Modal>
  );
}