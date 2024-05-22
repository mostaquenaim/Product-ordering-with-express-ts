import { Request, Response, NextFunction } from 'express';
import { ProductService } from './product.service';
import { productSchema } from './product.validator';

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productSchema.validateAsync(req.body);
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Product created successfully!',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getProductById(req.params.productId);
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productSchema.validateAsync(req.body);
      const product = await ProductService.updateProduct(req.params.productId, req.body);
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.deleteProduct(req.params.productId);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const searchTerm = req.query.searchTerm as string;
      const products = await ProductService.searchProducts(searchTerm);
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }
}
