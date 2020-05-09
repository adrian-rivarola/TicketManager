import React, { useState } from 'react';

import { Modal, Segment, Divider, Header, Button, Icon } from 'semantic-ui-react';
import EventForm from './EventForm';

export default function EventModal({ setMensaje, setNewEvent }) {
	const [open, setOpen] = useState(false);

	const closeModal = () => setOpen(false);
	const openModal = () => setOpen(true);
	
	return (
		<Modal
			size="tiny"
			open={open}
			onClose={closeModal}
			trigger={
				<Segment basic textAlign="center">
					<Button
	          onClick={openModal}
	          content="Nuevo Evento"
	          icon="plus"
	          color="teal"
	          className="new-event" />
	       </Segment>
			}
			closeIcon
		>
		 <Modal.Content>
				<Segment padded>
					<Divider horizontal>
				    <Header as='h4'>
				      <Icon name='announcement' />
				      Crear evento
				    </Header>
				  </Divider>
					<EventForm 
						setMensaje={setMensaje}
						setNewEvent={setNewEvent}
						closeModal={closeModal} />
				</Segment>
			</Modal.Content>
		</Modal>
	);
}