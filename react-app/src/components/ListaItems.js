import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { useQuery} from '@apollo/react-hooks';
import { useLocalStorage } from '../util/hooks';

import { Modal, Segment, Card } from 'semantic-ui-react';

function ListaItems({
  itemName,
  query,
  itemComponent,
  modalComponent: ModalComponent,
  modalHeader
}) {
  const [items, setItems] = useLocalStorage(itemName);
  const [selectedItem, setSelectedItem] = useState(null);

  const queryOptions = {
    skip: !navigator.onLine,
    onCompleted: (data) => data && setItems(data[itemName]),
    onError: (error) => alert(JSON.stringify(error))
  }
  const { loading } = useQuery(query, queryOptions);

  useEffect(() => {
    if (!selectedItem) return
  
    function listener() {
      setSelectedItem(null);
    }
    window.addEventListener('popstate', listener);
    return () => {
      window.removeEventListener('popstate', listener);
    }
  }, [selectedItem])
  
	return (
    <React.Fragment>
      { loading && <div className="ui active centered inline loader"></div> }
      <ItemGroup
        items={items}
        itemName={itemName}
        Component={itemComponent}
        setSelectedItem={setSelectedItem}
      />
      { selectedItem &&
        <Modal
          defaultOpen
          onClose={() => window.history.back()}
          size="tiny"
          closeIcon
        >
          <Modal.Header>
            <h4>
              <FormattedMessage id={modalHeader} />
            </h4>
          </Modal.Header>
          <Modal.Content>
            <ModalComponent item={selectedItem} />
          </Modal.Content>
        </Modal>
      }
    </React.Fragment>
	);
}

const ItemGroup = React.memo(({ items, itemName, Component, setSelectedItem }) => ( 
  <Card.Group
    stackable
    itemsPerRow={items.length === 1 ? 1:2}
    className="item-group"
  >
  { items.length
    ? items
      .map((item, idx) => (
        <Component
          key={idx}
          item={item}
          activateModal={() => setSelectedItem(item)}
          className={items.length === 1 ? 'card500' : ''}
        /> 
      ))
    : <Segment padded textAlign="center" className="no-items">
        <p>
          <FormattedMessage id={`${itemName}.empty`} />
        </p>
      </Segment>
  }
    </Card.Group>
));

export default React.memo(ListaItems);