type Item = {
  id: number;
  name: string;
  priority: number;
  status: number;
};

type ChangeStatus = (selectedItem: Item) => void;

type AddItem = (newItem: Item) => void;

type DeleteItem = (selectedItem: Item) => void;

type UpdateItem = (selectedItem: Item) => boolean;
