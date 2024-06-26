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
const order_validator_1 = require("./order.validator");
const errorHandler_1 = require("../middlewares/errorHandler");
class OrderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield order_validator_1.orderSchema.validateAsync(req.body);
                const order = yield order_service_1.OrderService.createOrder(req.body);
                res.status(201).json({
                    success: true,
                    message: 'Order created successfully!',
                    data: order
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllOrders(req, res, next) {
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
                next(error);
            }
        });
    }
    static getOrdersByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield order_service_1.OrderService.getOrdersByEmail(req.params.email);
                if (!order) {
                    throw new errorHandler_1.ApiError(404, 'Order not found');
                }
                res.status(200).json({
                    success: true,
                    message: 'Order fetched successfully!',
                    data: order
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.OrderController = OrderController;
