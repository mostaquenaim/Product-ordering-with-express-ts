import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.routes";
import { OrderRoutes } from "./modules/orders/order.routes";
import { errorHandler, notFoundHandler } from "./modules/middlewares/errorHandler";
const app = express();

//parsers
app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello sir!");
});

export default app;
