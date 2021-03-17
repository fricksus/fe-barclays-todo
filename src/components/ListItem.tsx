import React, { ChangeEvent, useState } from 'react';

interface ListItemProps {
  item: Item;
  changeStatus: ChangeStatus;
  deleteItem: DeleteItem;
  updateItem: UpdateItem;
}

export const ListItem: React.FC<ListItemProps> = ({
  item,
  changeStatus,
  deleteItem,
  updateItem,
}) => {
  const [newItem, setNewItem] = useState<Item>(item);
  const [shouldHide, setShouldHide] = useState(true);

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    item.status = parseInt(e.target.value);
    changeStatus(item);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, name: e.target.value });
  };

  const handleUpdate = (e: any) => {
    if (item !== newItem && !updateItem(newItem)) {
      setNewItem(item);
    }
    setShouldHide(true);
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, priority: parseInt(e.target.value) });
  };

  const enableSubmit = () => {
    if (JSON.stringify(item) !== JSON.stringify(newItem)) {
      return setShouldHide(false);
    }
    setShouldHide(true);
  };

  return (
    <li>
      <input
        onBlur={enableSubmit}
        value={newItem.name}
        className='input-list-name'
        onChange={handleNameChange}
      />
      <input
        onBlur={enableSubmit}
        value={newItem.priority}
        className='input-list'
        onChange={handlePriorityChange}
      />
      <select
        className='input'
        value={item.status}
        onChange={handleStatusChange}
      >
        <option value={0}>Open</option>
        <option value={1}>In Progress</option>
        <option value={2}>Completed</option>
      </select>
      <button className='button-list' onClick={() => deleteItem(item)}>
        x
      </button>
      <button
        className={shouldHide ? 'hidden' : 'button-list-submit'}
        onClick={handleUpdate}
      >
        Submit
      </button>
    </li>
  );
};
