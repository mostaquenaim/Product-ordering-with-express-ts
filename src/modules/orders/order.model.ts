import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOrder extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}

const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

OrderSchema.methods.toJSON = function () {
  const order = this.toObject();
  delete order.__v;
  delete order._id;

  return order;
};

export const Order: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);
