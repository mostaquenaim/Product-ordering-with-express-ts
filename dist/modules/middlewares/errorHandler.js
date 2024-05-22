"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.notFoundHandler = exports.errorHandler = void 0;
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ApiError = ApiError;
const errorHandler = (err, req, res) => {
    const statusCode = err instanceof ApiError ? err.status : 400;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message
    });
};
exports.errorHandler = errorHandler;
// To handle 404 errors for undefined routes
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
};
exports.notFoundHandler = notFoundHandler;
