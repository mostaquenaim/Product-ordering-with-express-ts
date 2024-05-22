import { Order } from './order.model';
import { TOrder } from './order.interface';
import Product from '../products/product.model';
import { ApiError } from '../middlewares/errorHandler';

export class OrderService {
  static async createOrder(payload: TOrder) {
    const product = await Product.findById(payload.productId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (product.inventory.quantity < payload.quantity) {
      throw new ApiError(400, 'Insufficient quantity available in inventory');
    }

    // Reduce the product quantity and update inStock status
    product.inventory.quantity -= payload.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the updated product
    await product.save();
    
    // Create the order
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
    if (!orders.length) throw new ApiError(404, 'Order not found');
    return orders
  }
}
