import React, { useState } from 'react';

import { Modal, Card } from 'semantic-ui-react';

function ListaItems({ 
	items,
	itemComponent: ItemComponent,
	modalHeader,
	modalComponent: ModalComponent,
  sendActiveItemAs,
  ...modalProps
}) {

  const [selectedItem, setSelectedItem] = useState(null);
  
  if (sendActiveItemAs && selectedItem) {
    modalProps[sendActiveItemAs] = selectedItem;
  }

	return (
		<React.Fragment>
      <Card.Group stackable itemsPerRow={items.length === 1 ? 1:2} className="ticket-group">
	    { items.map((item, idx) => 
  	    <ItemComponent 
  	      key={idx}
  	      item={item}
  	      activateModal={() => setSelectedItem(item)}
  	      className={items.length === 1 ? 'card500':''} />
  	    ) 
	    }
      </Card.Group>
      <Modal
        open={selectedItem != null}
        onClose={() => setSelectedItem(null)}
        size="tiny"
        closeIcon
      >
        <Modal.Header>
          <h4> {modalHeader} </h4>
        </Modal.Header>
        <Modal.Content>
        { selectedItem && <ModalComponent {...modalProps} />}
        </Modal.Content>
      </Modal>
    </React.Fragment>
	);
}

export default React.memo(ListaItems);