import React from 'react';

import { Button, Card } from 'semantic-ui-react';

export default function Event({ event }) {

	return (
		<Card raised>
	    <Card.Content header={event.name}  />
	    <Card.Content description={event.description} />
	    <Card.Content textAlign="center">
      	<Button icon="info" content="Información" color="blue" />
      	<Button icon="group" content="Participantes" color="olive" />
	    </Card.Content>
	  </Card>
	);
}
