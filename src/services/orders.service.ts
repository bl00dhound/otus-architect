import bus from '../providers/bus';
import { OrderStatus, Events } from '../constants';
import { OrderSchema } from '../schemas';
import IOrder from '../interfaces/IOrder';
import OrderDAO from '../dao/orders.dao';

export default class OrderService {
  static async createOrder(userId: string, orderData: { amount: number }): Promise<IOrder> {
    const data = {
      user_id: Number(userId),
      amount: orderData.amount,
      status: OrderStatus.PENDING,
    };

    const isValid = OrderSchema(data);

    if (!isValid || Object.keys(data).length < 3) throw Error(OrderSchema?.errors?.[0]?.message || 'validation error');

    const order = await OrderDAO.create(data);

    await bus.publish(Events.CREATE_ORDER, {
      ...data,
      id: order.id,
    });
    return order;
  }
}
