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
const product_validator_1 = require("./product.validator");
const errorHandler_1 = require("../middlewares/errorHandler");
class ProductController {
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_validator_1.productSchema.validateAsync(req.body);
                const product = yield product_service_1.ProductService.createProduct(req.body);
                res.status(201).json({
                    success: true,
                    message: 'Product created successfully!',
                    data: product
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_service_1.ProductService.getAllProducts();
                res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully!',
                    data: products
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.ProductService.getProductById(req.params.id);
                if (!product) {
                    throw new errorHandler_1.ApiError(404, 'Product not found');
                }
                res.status(200).json({
                    success: true,
                    message: 'Product fetched successfully!',
                    data: product
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_validator_1.productSchema.validateAsync(req.body);
                const product = yield product_service_1.ProductService.updateProduct(req.params.id, req.body);
                if (!product) {
                    throw new errorHandler_1.ApiError(404, 'Product not found');
                }
                res.status(200).json({
                    success: true,
                    message: 'Product updated successfully!',
                    data: product
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.ProductService.deleteProduct(req.params.id);
                if (!product) {
                    throw new errorHandler_1.ApiError(404, 'Product not found');
                }
                res.status(200).json({
                    success: true,
                    message: 'Product deleted successfully!',
                    data: null
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static searchProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const searchTerm = req.query.searchTerm;
                const products = yield product_service_1.ProductService.searchProducts(searchTerm);
                res.status(200).json({
                    success: true,
                    message: `Products matching search term '${searchTerm}' fetched successfully!`,
                    data: products
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
