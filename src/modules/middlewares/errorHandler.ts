import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (err: ApiError | ValidationError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err instanceof ApiError ? err.status : 400;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message
  });
};

// To handle 404 errors for undefined routes
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};

export { ApiError };
