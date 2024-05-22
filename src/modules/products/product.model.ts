import mongoose, { Schema, Document, model } from 'mongoose';
import { TProduct, TVariant, TInventory } from './product.interface';

interface IProductDocument extends TProduct, Document {}

const productSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: [
    {
      type: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
  }
});

// productSchema.methods.toJSON = function () {
//   const product = this.toObject();
//   delete product.__v;
//   delete product._id;

//   // Remove _id fields from nested objects
//   product.variants.forEach(variant => delete variant._id);
//   delete product.inventory._id;

//   return product;
// };

export const Product = model<IProductDocument>('Product', productSchema);

export default Product;
