import React from 'react';

import { Modal } from 'semantic-ui-react';

function TicketModal({ header, open, onClose, children }) {

  return (
    <Modal
      open={open}
      size="tiny"
      onClose={onClose}
      closeIcon
    >
      <Modal.Header>
        { header }
      </Modal.Header>
      <Modal.Content>
        { children }
      </Modal.Content>
    </Modal>
  );
}

export default React.memo(TicketModal);