
import React from 'react';
import { LogoIcon } from './Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="mb-6 md:mb-0">
                        <a href="#" className="flex items-center space-x-2">
                            <LogoIcon className="h-8 w-auto"/>
                            <span className="text-2xl font-bold text-white">Gemini<span className="text-blue-400">Commerce</span></span>
                        </a>
                        <p className="mt-4 text-sm text-gray-400">The future of online shopping, powered by AI.</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">New Arrivals</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Best Sellers</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">All Products</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">FAQ</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Shipping & Returns</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-base text-gray-400 hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Gemini Commerce. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
