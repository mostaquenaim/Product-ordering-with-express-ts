import { Request, Response } from 'express';
import { ProductService } from './product.service';

export class ProductController {
    static async createProduct(req: Request, res: Response) {
        try {
            const result = await ProductService.createProduct(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async getAllProducts(req: Request, res: Response) {
        try {
            const { searchTerm } = req.query;

            const result = await ProductService.getAllProducts(searchTerm as string);
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getProductById(req: Request, res: Response) {
        try {
            const result = await ProductService.getProductById(req.params.id);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const result = await ProductService.updateProduct(req.params.id, req.body);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const result = await ProductService.deleteProduct(req.params.id);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async searchProducts(req: Request, res: Response) {
        try {
            const result = await ProductService.searchProducts(req.params.term);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
