import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Card, Button } from 'semantic-ui-react';

const ErrorCard = React.memo(({ error, clearResults }) => (
  <Card color='red' className='scan-result card500'>
    <Card.Content header='Error' />
    { error["graphQLErrors"]
      ? <React.Fragment> 
          <Card.Content description={error["graphQLErrors"][0].message} />
          <Card.Content extra>
            <Button
              basic
              color="red"
              content={ <FormattedMessage id='go-back' /> }
              icon="left arrow"
              onClick={clearResults}
            />
          </Card.Content>
        </React.Fragment>
      : <React.Fragment>
          <Card.Content description>
            <FormattedMessage id='scanner.camera-error' />
          </Card.Content>
          <Card.Content extra>
          <Button
            basic
            color="red"
            content={ <FormattedMessage id='go-back' /> }
            icon="left arrow"
            as={Link}
            to="/eventos"
            replace
          />
          </Card.Content>
        </React.Fragment>
    }
  </Card>
));

const SuccessCard = React.memo(({ data: ticket, clearResults }) => (
  <Card color='green' className='scan-result card500'>
    <Card.Content 
      header={ <b><FormattedMessage id='ticket.valid' /></b> } 
    />
    <Card.Content>
      <FormattedMessage id='username' />: 
      <br />
      <b>{ticket.owner.username}</b>
    </Card.Content>
    <Card.Content extra>
      <Button
        basic
        color="green"
        content={ <FormattedMessage id='go-back' /> }
        icon="left arrow"
        onClick={clearResults}
      />
    </Card.Content>
  </Card>
));

const ScanResult = ({ data, error, clearResults}) => (
  data 
    ? <SuccessCard data={data} clearResults={clearResults} />
    : <ErrorCard error={error} clearResults={clearResults} />
)


export default React.memo(ScanResult);