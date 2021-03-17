import React from 'react';
import { ListItem } from './ListItem';

interface ItemListProps {
  items: Array<Item>;
  changeStatus: ChangeStatus;
  deleteItem: DeleteItem;
  updateItem: UpdateItem;
}

export const ItemsList: React.FC<ItemListProps> = ({
  items,
  changeStatus,
  deleteItem,
  updateItem,
}) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <ListItem
            key={item.id}
            item={item}
            changeStatus={changeStatus}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        );
      })}
    </ul>
  );
};
