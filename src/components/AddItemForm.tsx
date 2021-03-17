import React, { ChangeEvent, FormEvent, useState } from 'react';

interface AddItemFormProps {
  addItem: AddItem;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({
  addItem,
}) => {
  const [newItem, setNewItem] = useState<Item>({
    name: '',
    id: 0,
    status: 0,
    priority: 0,
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, name: e.target.value });
  };

  const handlePriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, priority: parseInt(e.target.value) });
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewItem({ ...newItem, status: parseInt(e.target.value) });
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addItem(newItem);
    setNewItem({ name: '', id: 0, status: 0, priority: 0 });
  };

  return (
    <form>
      <input
        className='input'
        type='text'
        value={newItem.name}
        onChange={handleNameChange}
        placeholder='Name'
      />
      <input
        className='input'
        type='number'
        value={newItem.priority}
        onChange={handlePriorityChange}
        placeholder='Priority'
        min='0'
      />
      <select
        className='input'
        value={newItem.status}
        onChange={handleStatusChange}
      >
        <option value={0}>Open</option>
        <option value={1}>In Progress</option>
        <option value={2}>Completed</option>
      </select>
      <button className='button' type='submit' onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
};
