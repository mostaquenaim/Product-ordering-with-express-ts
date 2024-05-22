import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { orderSchema } from './order.validator';
import { ApiError } from '../middlewares/errorHandler';

export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      await orderSchema.validateAsync(req.body);
      const order = await OrderService.createOrder(req.body);
      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: order
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;

      const orders = await OrderService.getAllOrders(email as string);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: orders
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOrdersByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.getOrdersByEmail(req.params.email);
      if (!order) {
        throw new ApiError(404, 'Order not found');
      }
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: order
      });
    } catch (error) {
      next(error);
    }
  }
}
