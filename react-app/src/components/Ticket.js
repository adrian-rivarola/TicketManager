import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

import { Icon, Card, Modal, Image } from 'semantic-ui-react';

export default function Ticket({ ticket: { id, event } }) {
  return (
    <Card  raised className="ticket">
      <TicketModal id={id}  name={event.name} />
      <Card.Content description={event.description} />
      <Card.Content extra>
        <Icon name='calendar alternate outline' />{event.date}
      </Card.Content>
    </Card>
  );
}

const TicketModal = ({ id, name }) => {
  const [open, setOpen] = useState(false);
  
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);
  
  const [qr_code, setQr_code] = useState('');
  
  useEffect(() => {
    const qr = localStorage.getItem(`ticket-${id}`);
    if (qr) setQr_code(qr);
    else 
      QRCode.toDataURL(id, { width: 512, margin: 1 }, (_, url) => {
        localStorage.setItem(`ticket-${id}`, url);
        setQr_code(url);
      });
  }, [id]);
  
  return (
    <Modal
      size='mini'
      open={open}
      onClose={closeModal}
      closeIcon
      trigger={
        <Card.Content onClick={openModal} style={{cursor: "pointer"}}>
          <b>{name}</b>
          <Icon name='qrcode' size="large" style={{ float: 'right' }} />
        </Card.Content>
      }
    >
      <Modal.Header>{`Ticket para "${name}"`}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='large' src={qr_code} className="qr-code" />
      </Modal.Content>
    </Modal>
  );
}