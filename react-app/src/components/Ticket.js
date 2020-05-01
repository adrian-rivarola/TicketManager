import React, { useState } from 'react';
import QRCode from 'qrcode';

import { Icon, Card, Modal, Image } from 'semantic-ui-react';

export default function Ticket({ ticket: { id, event } }) {
	const [qr_code, setQr_code] = useState('');

	!qr_code && QRCode.toDataURL(id, { width: 512, margin: 1 }, (err, url) => {
		if (err) throw Error(err);
		setQr_code(url);
	});

	return (
		<Card  raised className="ticket">
	    <TicketModal qr={qr_code}  name={event.name} />
	    <Card.Content description={event.description} />
	    <Card.Content extra>
	      <Icon name='calendar alternate outline' />{event.date}
	    </Card.Content>
	  </Card>
	);
}

const TicketModal = ({ qr, name }) => {
	const [open, setOpen] = useState(false);
	
	const closeModal = () => setOpen(false);
	const openModal = () => setOpen(true);

	return (
		<Modal
			size='mini'
			open={open}
			onClose={closeModal}
			closeIcon
			trigger={
				<Card.Content onClick={openModal} as="div" style={{cursor: "pointer"}}>
	    		<b>{name}</b>
					<Icon name='qrcode' size="large" style={{ float: 'right' }} />
				</Card.Content>
			}
		>
	    <Modal.Header>{`Ticket para "${name}"`}</Modal.Header>
	    <Modal.Content image>
	    	<Image wrapped size='large' src={qr} className="qr-code" />
	  	</Modal.Content>
	  </Modal>
	);
}