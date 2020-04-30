import React, { useState } from 'react';

import { Modal, Icon, Card } from 'semantic-ui-react';

export default function Event({ event }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<Card onClick={ev => setShowModal(true)}>
			<EventModal event={event} open={showModal} hideModal={() => setShowModal(false)} />
	    <Card.Content header={event.name}  />
	    <Card.Content description={event.description} />
	    <Card.Content extra>
	      <Icon name='calendar alternate outline' />{event.date}
	    </Card.Content>
	  </Card>
	);
}

const EventModal = ({ event, open, hideModal }) => (
	<Modal
		open={open}
		closeOnDocumentClick={true}
		onClose={hideModal} 
	>
    <Modal.Content>
 	     
    </Modal.Content>
  </Modal>
);