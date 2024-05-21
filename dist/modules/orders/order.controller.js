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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
class OrderController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield order_service_1.OrderService.createOrder(req.body);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
        });
    }
    static getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                const orders = yield order_service_1.OrderService.getAllOrders(email);
                res.status(200).json({
                    success: true,
                    message: 'Orders fetched successfully!',
                    data: orders
                });
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    }
    static getOrdersByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield order_service_1.OrderService.getOrdersByEmail(req.params.email);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
        });
    }
}
exports.OrderController = OrderController;
