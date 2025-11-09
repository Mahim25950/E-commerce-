
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="group relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-medium text-gray-500">{product.category}</h3>
                <p className="text-lg font-semibold text-gray-900 mt-1 flex-grow">{product.name}</p>
                <p className="mt-2 text-2xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
                <button
                    onClick={() => onAddToCart(product)}
                    className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
