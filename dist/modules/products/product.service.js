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
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new product_model_1.default(payload);
    yield newProduct.save();
    return {
        success: true,
        message: "Product created successfully!",
        data: newProduct
    };
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
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(id);
    if (!product) {
        return { success: false, message: "Product not found!" };
    }
    return {
        success: true,
        message: "Product fetched successfully!",
        data: product
    };
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedProduct) {
        return { success: false, message: "Product not found!" };
    }
    return {
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct
    };
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.default.findByIdAndDelete(id);
    if (!deletedProduct) {
        return { success: false, message: "Product not found!" };
    }
    return {
        success: true,
        message: "Product deleted successfully!",
        data: null
    };
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
    return {
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products
    };
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};
