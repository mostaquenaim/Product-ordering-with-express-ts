"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = require("./modules/products/product.routes");
const order_routes_1 = require("./modules/orders/order.routes");
const errorHandler_1 = require("./modules/middlewares/errorHandler");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use("/api/products", product_routes_1.ProductRoutes);
app.use("/api/orders", order_routes_1.OrderRoutes);
// Error handling middleware
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
app.get("/", (req, res) => {
    res.send("Hello sir!");
});
exports.default = app;
