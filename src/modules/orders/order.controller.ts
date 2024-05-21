import { Request, Response } from 'express';
import { OrderService } from './order.service';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const result = await OrderService.createOrder(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async getAllOrders(req: Request, res: Response) {
    try {
      const { email } = req.query;

      const orders = await OrderService.getAllOrders(email as string);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: orders
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getOrdersByEmail(req: Request, res: Response) {
    try {
      const result = await OrderService.getOrdersByEmail(req.params.email);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
