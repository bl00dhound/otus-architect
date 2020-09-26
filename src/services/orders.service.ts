import logger from '../providers/logger';
import bus from '../providers/bus';
import { OrderStatus, Events } from '../constants';
import { OrderSchema } from '../schemas';
import IOrder from '../interfaces/IOrder';
import OrderDAO from '../dao/orders.dao';

export default class OrderService {
  static async createOrder(
    userId: string,
    orderData: { amount: number },
    xRequestId: string,
  ): Promise<IOrder> {
    const data = {
      user_id: Number(userId),
      amount: orderData.amount,
      status: OrderStatus.PENDING,
      request_id: xRequestId || '',
    };

    const isValid = OrderSchema(data);

    if (!isValid || Object.keys(data).length < 3) throw Error(OrderSchema?.errors?.[0]?.message || 'validation error');

    const orderByRequestId = await OrderDAO.getOrderByRequestId(xRequestId);

    if (orderByRequestId?.id) {
      logger.info(`[Order was already created]: ${orderByRequestId.id}`);
      return orderByRequestId;
    }

    const order = await OrderDAO.create(data);

    const result = await bus.publish(Events.CREATE_ORDER, {
      ...data,
      id: order.id,
    });
    logger.info(`[Order was successfully sended to Bus]: ${result}`);
    return order;
  }
}
