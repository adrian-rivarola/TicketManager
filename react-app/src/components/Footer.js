import React from 'react';

import { Segment, Button } from 'semantic-ui-react';

const Footer = props => (
  <Segment
    textAlign='center'
    attached='bottom'
    style={{padding: 12}}
  >
    Adrián Rivarola - 2020 <br />
    <Button icon='github' basic circular as='a' href='https://github.com/adrian2358' target='_blank' />
  </Segment>
);

export default Footer;