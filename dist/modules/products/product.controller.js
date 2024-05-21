"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
class ProductController {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.ProductService.createProduct(req.body);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchTerm } = req.query;
                const result = yield product_service_1.ProductService.getAllProducts(searchTerm);
                res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully!',
                    data: result
                });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    }
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.ProductService.getProductById(req.params.id);
                if (result.success) {
                    res.status(200).json(result);
                }
                else {
                    res.status(404).json(result);
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.ProductService.updateProduct(req.params.id, req.body);
                if (result.success) {
                    res.status(200).json(result);
                }
                else {
                    res.status(404).json(result);
                }
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.ProductService.deleteProduct(req.params.id);
                if (result.success) {
                    res.status(200).json(result);
                }
                else {
                    res.status(404).json(result);
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    }
    static searchProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_service_1.ProductService.searchProducts(req.params.term);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    }
}
exports.ProductController = ProductController;
