import Product from './product.model';
import { TProduct } from './product.interface';

const createProduct = async (payload: TProduct) => {
    const newProduct = new Product(payload);
    await newProduct.save();
    return {
        success: true,
        message: "Product created successfully!",
        data: newProduct
    };
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

const getProductById = async (id: string) => {
    const product = await Product.findById(id);
    if (!product) {
        return { success: false, message: "Product not found!" };
    }
    return {
        success: true,
        message: "Product fetched successfully!",
        data: product
    };
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedProduct) {
        return { success: false, message: "Product not found!" };
    }
    return {
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct
    };
};

const deleteProduct = async (id: string) => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
        return { success: false, message: "Product not found!" };
    }
    return {
        success: true,
        message: "Product deleted successfully!",
        data: null
    };
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
    return {
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products
    };
};

export const ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
};
