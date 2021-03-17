import axios, { AxiosResponse } from 'axios';

export class ItemService {
  client = axios.create({
    baseURL: 'https://localhost:44317',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  GetAll = (): Promise<AxiosResponse<Item[]>> => {
    return this.client.get<Item[]>(`/items`);
  };

  Get = (id: number): Promise<AxiosResponse<Item>> => {
    return this.client.get<Item>(`/items/${id}`);
  };

  Create = (item: Item): Promise<AxiosResponse<Item>> => {
    return this.client.post(`/Items`, item);
  };

  Update = (item: Item): Promise<AxiosResponse<Item>> => {
    return this.client.put<Item>(`/items/${item.id}`, item);
  };

  Delete = (id: number): Promise<AxiosResponse<Item>> => {
    return this.client.delete(`/items/${id}`);
  };
}
