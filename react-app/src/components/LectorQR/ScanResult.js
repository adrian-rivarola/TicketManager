import React from 'react';
import { Link } from 'react-router-dom';

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
              content="Volver"
              icon="left arrow"
              onClick={clearResults}
            />
          </Card.Content>
        </React.Fragment>
      : <React.Fragment>
          <Card.Content description="No se puede acceder a la cámara" />
          <Card.Content extra>
          <Button
            basic
            color="red"
            content="Volver a Eventos"
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
    <Card.Content header="Ticket válido" />
    <Card.Content>
      <p>
        Nombre del particpante: <br />
        <b>{ticket.owner.username}</b>
      </p>
    </Card.Content>
    <Card.Content extra>
      <Button
        basic
        color="green"
        content="Volver"
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