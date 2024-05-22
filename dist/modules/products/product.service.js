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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const errorHandler_1 = require("../middlewares/errorHandler");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new product_model_1.default(payload);
    yield newProduct.save();
    return newProduct;
});
const getAllProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case insensitive
        query = {
            $or: [
                { name: regex },
                { description: regex },
                { category: regex },
                { tags: regex }
            ]
        };
    }
    const products = yield product_model_1.default.find(query);
    return products.map(product => product.toJSON());
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new errorHandler_1.ApiError(404, "Product not found!");
    }
    return product;
});
const updateProduct = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productId, payload, { new: true });
    if (!updatedProduct) {
        throw new errorHandler_1.ApiError(404, "Product not found!");
    }
    return updatedProduct;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.default.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new errorHandler_1.ApiError(404, "Product not found!");
    }
    return deletedProduct;
});
const searchProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({
        $or: [
            { name: new RegExp(searchTerm, 'i') },
            { description: new RegExp(searchTerm, 'i') },
            { category: new RegExp(searchTerm, 'i') },
            { tags: { $in: [new RegExp(searchTerm, 'i')] } }
        ]
    });
    return products;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};
