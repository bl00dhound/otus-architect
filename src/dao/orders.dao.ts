import db from '../providers/db';
import IOrder, { IOrderData } from '../interfaces/IOrder';

export default class DAO {
  static async create(orderData: IOrderData): Promise<IOrder> {
    return db('orders')
      .insert(orderData)
      .returning(['id', 'user_id', 'amount', 'status'])
      .then((orders) => orders[0]);
  }
}
