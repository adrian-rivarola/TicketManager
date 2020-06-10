import React from 'react';

import { Segment } from 'semantic-ui-react';
import QRCode from 'qrcode.react';

function TicketQR({ item: { id, event: { name } } }) {
	return (
		<Segment textAlign="center" basic>
			<QRCode
				value={id}
				size={256}
        className="qr-code"
        style={{}}
      />
      <hr />
      <p><b>{name}</b></p>
		</Segment>
	);
}

export default React.memo(TicketQR);