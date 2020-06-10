import React, { useState } from 'react';

import QrReader from 'react-qr-reader';
import { FormattedMessage } from 'react-intl';

import { useMutation } from '@apollo/react-hooks';
import ticket_mutation from './validar_ticket_mutation';

import { Segment, Button } from 'semantic-ui-react';
import Header from '../Header';

import ScanResult from './ScanResult';

const Lector = props => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const [validar] = useMutation(ticket_mutation, {
    update(_, { data: { validar_ticket }}) {
      setScanResult({data: validar_ticket});
      setIsScanning(false);

      props.history.push('#result');
    },
    onError(error) {
      setScanResult({error});
      setIsScanning(false);

      props.history.push('#result');
    }
  });

  const handleScan = (data) => {
    if (!data) return;
    if (!data.match(/^[0-9a-fA-F]{24}$/)) {
      alert('That\'s not a valid code!');
      return;
    }

    setIsScanning(true);
    validar({
      variables: {
        id: data
      }
    });
  }

  return (
    <Segment attached color="blue" className="fh">
      <Header titulo="scanner.title" icono='qrcode' />
      <Segment basic textAlign='center' >
      { isScanning
        ? <div className="ui active centered inline loader"></div>
        : scanResult === null
          ? <div className="ticket-scanner">
              <QrReader
                delay={200}
                onScan={handleScan}
                onError={error => setScanResult({error})}
              />
            </div>
        : <ScanResult
            clearResults={() => setScanResult(null)}
            {...scanResult}
          />
      }
        <br />
        <Button
          basic
          color='blue'
          icon='arrow left'
          disabled={isScanning}
          content={ <FormattedMessage id='go-back' />}
          onClick={props.history.goBack}
        />
      </Segment>
    </Segment>
  );
}

export default Lector;