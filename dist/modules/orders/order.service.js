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
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const product_model_1 = __importDefault(require("../products/product.model"));
const errorHandler_1 = require("../middlewares/errorHandler");
class OrderService {
    static createOrder(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findById(payload.productId);
            if (!product) {
                throw new errorHandler_1.ApiError(404, 'Product not found');
            }
            if (product.inventory.quantity < payload.quantity) {
                throw new errorHandler_1.ApiError(400, 'Insufficient quantity available in inventory');
            }
            // Reduce the product quantity and update inStock status
            product.inventory.quantity -= payload.quantity;
            product.inventory.inStock = product.inventory.quantity > 0;
            // Save the updated product
            yield product.save();
            // Create the order
            const order = new order_model_1.Order(payload);
            yield order.save();
            return {
                success: true,
                message: 'Order created successfully!',
                data: order
            };
        });
    }
    static getAllOrders(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (email) {
                query = { email };
            }
            const orders = yield order_model_1.Order.find(query);
            return orders.map(order => order.toJSON());
        });
    }
    static getOrdersByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.Order.find({ email });
            if (!orders.length)
                throw new errorHandler_1.ApiError(404, 'Order not found');
            return orders;
        });
    }
}
exports.OrderService = OrderService;
