import { Order } from './order.model';
import { TOrder } from './order.interface';

export class OrderService {
  static async createOrder(payload: TOrder) {
    const order = new Order(payload);
    await order.save();
    return {
      success: true,
      message: 'Order created successfully!',
      data: order
    };
  }

  static async getAllOrders(email?: string) {
    let query = {};
    if (email) {
      query = { email };
    }

    const orders = await Order.find(query);
    return orders.map(order => order.toJSON());
  }

  static async getOrdersByEmail(email: string) {
    const orders = await Order.find({ email });
    return {
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: orders
    };
  }
}
