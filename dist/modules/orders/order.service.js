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
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
class OrderService {
    static createOrder(payload) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return {
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: orders
            };
        });
    }
}
exports.OrderService = OrderService;
