import { OrderStatus } from '../constants';

export interface IOrderData {
  user_id: number;
  amount: number;
  status: OrderStatus;
}

export default interface IOrder extends IOrderData {
  created_at: Date,
  updated_at: Date,
  id: number,
}
