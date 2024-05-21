"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
productSchema.methods.toJSON = function () {
    const product = this.toObject();
    delete product.__v;
    delete product._id;
    // Remove _id fields from nested objects
    product.variants.forEach(variant => delete variant._id);
    delete product.inventory._id;
    return product;
};
exports.Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = exports.Product;
