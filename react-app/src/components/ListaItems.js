import React, { useState, useEffect } from 'react';

import { Modal, Card } from 'semantic-ui-react';

function ListaItems({ 
	items,
	itemComponent,
	modalHeader,
	modalComponent: ModalComponent,
  sendActiveItemAs,
  ...modalProps
}) {

  const [selectedItem, setSelectedItem] = useState(null);
  
  useEffect(() => {
    if (!selectedItem) return
  
    const listener = () => setSelectedItem(null);

    window.addEventListener('popstate', listener);
    
    return () => {
      window.removeEventListener('popstate', listener);
    }
  }, [selectedItem])

  if (sendActiveItemAs && selectedItem) {
    modalProps[sendActiveItemAs] = selectedItem;
  }

	return (
		<React.Fragment>
      <ItemGroup
        items={items}
        ItemComponent={itemComponent}
        setSelectedItem={setSelectedItem} />
    { selectedItem &&
      <Modal
        open={selectedItem != null}
        onClose={() => {
          setSelectedItem(null)
          window.history.back()
        }}
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
    }
    </React.Fragment>
	);
}

const ItemGroup = React.memo(({ items, ItemComponent, setSelectedItem }) => 
  (
    <Card.Group stackable itemsPerRow={items.length === 1 ? 1:2} className="item-group">
    { items.map((item, idx) => 
      <ItemComponent 
        key={idx}
        item={item}
        activateModal={() => setSelectedItem(item)}
        className={items.length === 1 ? 'card500' : ''} />
      ) 
    }
    </Card.Group>
  )
);

export default React.memo(ListaItems);