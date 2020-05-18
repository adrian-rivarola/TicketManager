import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader';

import { Segment, Card, Button } from 'semantic-ui-react';
import Header from '../Header';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function VerificarTicket(props) {
  const [ticketId, setTicketId] = useState('');
  const [results, setResults] = useState('');
  const [error, setError] = useState(null);

  const [validar_ticket, { loading }] = useMutation(VALIDAR_TICKET_MUTATION, {
    update(_, { data: { validar_ticket }}) {
      setResults(validar_ticket);
    },
    onError(err) {
      alert(JSON.stringify(err))
    },
    variables: {id: ticketId}
  })

  const handleScan = data => {
    if (!data) return;
    setTicketId(data);
    validar_ticket();
  }

  return (
    <Segment raised loading={loading}>
      <Header titulo="Verificar Ticket" icono='qrcode' />
      <div className="ticket-scanner">
        { !results
          ? <Segment basic textAlign='center' >
            { error
              ? <ScannerError />
              : <QrReader
                  delay={300}
                  onError={setError}
                  onScan={handleScan}
                />
            }
              <Button
                fluid
                content='Volver'
                icon='arrow left'
                as={Link}
                to='/eventos'
              />
            </Segment>
          : <ScanResult 
              results={results} 
              clearResults={() => setResults('')}
            />
        }
      </div>
    </Segment>
  );
}

const ScannerError = ({ error }) => (
  <Card color="red">
    <Card.Content header="Error" />
    <Card.Content description="No se puede acceder a la cámara" />
  </Card>
);

const ScanResult = ({ results, clearResults }) => (
  <Card className="scan-result">
    <Card.Content header={results.event.name}  />
    <Card.Content description={`Este ticket pertenece a ${results.owner.username}`} />
    <Card.Content extra>
      <Button 
        basic
        content="Volver a escanear"
        onClick={clearResults} />
    </Card.Content>
  </Card>
);

const VALIDAR_TICKET_MUTATION = gql`
  mutation($id:ID!) {
    validar_ticket(id: $id) {
      id
      event {
        id
        name
        description
        date
        location
      }
      owner {
        id
        username
      }
    }
  }
`;

export default React.memo(VerificarTicket);