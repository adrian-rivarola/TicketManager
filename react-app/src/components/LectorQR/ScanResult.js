import React, { useEffect } from 'react';

import { FormattedMessage } from 'react-intl';

import { Card } from 'semantic-ui-react';

export default function ScanResult({ data, error, clearResults}) {

  useEffect(() => {
    window.addEventListener('popstate', clearResults);
    return () => {
      window.removeEventListener('popstate', clearResults);
    }
  }, [])

  return (
    <Card color={error ? 'red' : 'green'} className='scan-result card500'>
      { data
        ? <SuccessCard ticket={data} />
        : <ErrorCard error={error} />
      }
    </Card>
  );
}

const SuccessCard = ({ ticket }) => (
  <React.Fragment>
    <Card.Content 
      header={ <b><FormattedMessage id='ticket.valid' /></b> } 
    />
    <Card.Content>
      <FormattedMessage id='username' />: 
      <br />
      <b>{ticket.owner.username}</b>
    </Card.Content>
  </React.Fragment>
);

const ErrorCard = ({ error }) => (
  <React.Fragment>
    <Card.Content header='Error' />
    { error["graphQLErrors"]
      ? <Card.Content description={error["graphQLErrors"][0].message} />
      : <Card.Content description>
          <FormattedMessage id='scanner.camera-error' />
        </Card.Content>
    }
  </React.Fragment>
);