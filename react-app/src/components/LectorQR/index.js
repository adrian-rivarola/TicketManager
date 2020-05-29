import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader';
import { FormattedMessage } from 'react-intl';

import { useMutation } from '@apollo/react-hooks';
import ticket_mutation from './validar_ticket_mutation';

import { Segment, Button } from 'semantic-ui-react';
import Header from '../Header';

import ScanResult from './ScanResult'

const Lector = props => {
  const [scanResult, setScanResult] = useState(null);

  const [validar,  {loading}] = useMutation(ticket_mutation, {
    update(_, { data: { validar_ticket }}) {
      setScanResult({data: validar_ticket});
    },
    onError(error) {
      setScanResult({error});
    }
  });

  const handleScan = (data) => {
    if (!data) return;
    if (!data.match(/^[0-9a-fA-F]{24}$/)) {
      alert('That\'s not a valid code!');
      return;
    }

    validar({
      variables: {
        id: data
      }
    })
  }

  return (
    <Segment raised color="blue" loading={loading} className="fh">
      <Header titulo="scanner.title" icono='qrcode' />
      <Segment basic textAlign='center' >
        { scanResult === null
        ? <div className="ticket-scanner">
            <QrReader
              delay={300}
              onScan={handleScan}
              onError={error => setScanResult({error})}
            />
            <Button
              content={ <FormattedMessage id='go-back' />}
              icon='arrow left'
              as={Link}
              to='/eventos'
            />
          </div>
        : <ScanResult 
            clearResults={() => setScanResult(null)}
            {...scanResult}
          />
        }
      </Segment>
    </Segment>
  );
}

export default Lector;