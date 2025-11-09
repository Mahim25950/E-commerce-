
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';
import { Product, CartItem } from './types';
import { generateProducts } from './services/geminiService';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedProducts = await generateProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        setCartItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === product.id);
            if (itemInCart) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            handleRemoveItem(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const LoadingSpinner: React.FC = () => (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Summoning amazing gadgets...</p>
        </div>
    );
    
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
            <main className="flex-grow">
                <HeroSection />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Featured Products</h2>
                    <p className="text-center mt-2 text-lg text-gray-600">Handpicked for the tech enthusiast in you.</p>

                    {isLoading ? (
                         <div className="flex justify-center items-center h-64">
                            <LoadingSpinner />
                         </div>
                    ) : error ? (
                        <div className="text-center py-10 px-4">
                            <p className="text-red-500 font-semibold">{error}</p>
                        </div>
                    ) : (
                        <div className="mt-10 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <ShoppingCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
            />
        </div>
    );
};

export default App;
