import React from 'react';

import { Modal } from 'semantic-ui-react';
import QRCode from 'qrcode.react';

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
            <QRCode // TOOD: Centrar este componente
              value={ticket.id}
              size={256}
              className="qr-code"
              style={{}}
            /> 
          </Modal.Content>
        </React.Fragment>
      }
    </Modal>
  );
}