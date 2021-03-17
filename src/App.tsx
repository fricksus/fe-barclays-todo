import React, { useEffect, useState } from 'react';
import { AddItemForm } from './components/AddItemForm';
import { ItemService } from './services/ItemService';
import { ItemsList } from './components/ItemsList';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const itemService = new ItemService();

  useEffect(() => {
    itemService
      .GetAll()
      .then((result) => result.data)
      .then((result) => {
        setItems((existing) => [...existing, ...result]);
      });
  }, []);

  const addItem: AddItem = (newItem) => {
    const validationResult = handleValidation(newItem);
    if (validationResult !== 'OK') {
      return alert(validationResult);
    }

    itemService
      .Create(newItem)
      .then((result) => setItems([...items, result.data]))
      .catch(alert);
  };

  const deleteItem: DeleteItem = (selectedItem) => {
    if (selectedItem.status === 2) {
      setItems(items.filter((item) => item !== selectedItem));
      itemService.Delete(selectedItem.id);
    }
  };

  const updateItem: UpdateItem = (selectedItem) => {
    const validationResult = handleValidation(selectedItem);
    if (validationResult !== 'OK') {
      alert(validationResult);
      return false;
    }

    const newItems = items.map((item) => {
      if (item.id === selectedItem.id) {
        itemService.Update(selectedItem);

        return {
          ...item,
          ...selectedItem,
        };
      }
      return item;
    });
    setItems(newItems);
    return true;
  };

  const changeStatus: ChangeStatus = (selectedItem) => {
    const newItems = items.map((item) => {
      if (item === selectedItem) {
        itemService.Update(item);
        return {
          ...item,
          status: item.status,
        };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleValidation = (newItem: Item) => {
    if (
      items.some((item) => item.name === newItem.name && item.id !== newItem.id)
    ) {
      return 'Name duplication';
    }
    if (newItem.name.trim() === '') {
      return 'Empty name';
    }
    return 'OK';
  };

  return (
    <React.Fragment>
      <ItemsList
        items={items}
        changeStatus={changeStatus}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
      <AddItemForm addItem={addItem}/>
    </React.Fragment>
  );
}

export default App;
