import React, { useState } from 'react';

import { Icon, Card, Modal, Image } from 'semantic-ui-react';

export default function Ticket({ ticket: { id, event } }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<Card className="ticket" onClick={ev => setShowModal(true)}>
			<TicketModal event={event} open={showModal} hideModal={() => setShowModal(false)} />
	    <Card.Content header={event.name} />
	    <Card.Content description={event.description} />
	    <Card.Content extra>
	      <Icon name='calendar alternate outline' />{event.date}
	    </Card.Content>
	  </Card>
	);
}

const TicketModal = ({ event, open, hideModal }) => (
	<Modal 
		open={open}
		closeOnDocumentClick={true}
		onClose={hideModal} 
	>
    <Modal.Header>{ event.name }</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='large' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' className="qr-code" />
    </Modal.Content>
  </Modal>
);

// trigger={<Button>Show Modal</Button>}