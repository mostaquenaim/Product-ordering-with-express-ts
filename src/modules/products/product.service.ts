import Product from './product.model';
import { TProduct } from './product.interface';
import { ApiError } from '../middlewares/errorHandler';

const createProduct = async (payload: TProduct) => {
    const newProduct = new Product(payload);
    await newProduct.save();
    return newProduct
};

const getAllProducts = async (searchTerm?: string) => {
    let query = {};
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i'); // 'i' makes it case insensitive
        query = {
            $or: [
                { name: regex },
                { description: regex },
                { category: regex },
                { tags: regex }
            ]
        };
    }
    const products = await Product.find(query);
    return products.map(product => product.toJSON());
}

const getProductById = async (productId: string) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found!");
    }
    return product;
};

const updateProduct = async (productId: string, payload: Partial<TProduct>) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, payload, { new: true });
    if (!updatedProduct) {
        throw new ApiError(404, "Product not found!");
    }
    return updatedProduct
};

const deleteProduct = async (productId: string) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new ApiError(404, "Product not found!");
    }
    return deletedProduct;
};

const searchProducts = async (searchTerm: string) => {
    const products = await Product.find({
        $or: [
            { name: new RegExp(searchTerm, 'i') },
            { description: new RegExp(searchTerm, 'i') },
            { category: new RegExp(searchTerm, 'i') },
            { tags: { $in: [new RegExp(searchTerm, 'i')] } }
        ]
    });
    return products
};

export const ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};
