
import React, { Fragment } from 'react';
import { CartItem } from '../types';
import { XIcon, PlusIcon, MinusIcon, TrashIcon } from './Icons';

interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: string, newQuantity: number) => void;
    onRemoveItem: (productId: string) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={`fixed inset-0 overflow-hidden z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className="absolute inset-0 overflow-hidden">
                {/* Backdrop */}
                <div
                    onClick={onClose}
                    className={`absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                />

                <section className={`absolute inset-y-0 right-0 pl-10 max-w-full flex transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="w-screen max-w-md">
                        <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                                    <div className="ml-3 h-7 flex items-center">
                                        <button onClick={onClose} className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                            <XIcon className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flow-root">
                                        {cartItems.length === 0 ? (
                                            <p className="text-center text-gray-500">Your cart is empty.</p>
                                        ) : (
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li key={item.id} className="py-6 flex">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
                                                        </div>
                                                        <div className="ml-4 flex-1 flex flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>{item.name}</h3>
                                                                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 flex items-end justify-between text-sm">
                                                                <div className="flex items-center border border-gray-300 rounded">
                                                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-50" disabled={item.quantity <= 1}>
                                                                        <MinusIcon className="h-4 w-4" />
                                                                    </button>
                                                                    <span className="px-3 text-gray-700">{item.quantity}</span>
                                                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-500 hover:text-gray-800">
                                                                        <PlusIcon className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                                <div className="flex">
                                                                    <button onClick={() => onRemoveItem(item.id)} type="button" className="font-medium text-red-600 hover:text-red-500">
                                                                        <TrashIcon className="h-5 w-5"/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {cartItems.length > 0 && (
                                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>${subtotal.toFixed(2)}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                    <div className="mt-6">
                                        <a href="#" className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">Checkout</a>
                                    </div>
                                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                        <p>or <button type="button" onClick={onClose} className="text-blue-600 font-medium hover:text-blue-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShoppingCart;
