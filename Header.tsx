
import React, { useState } from 'react';
import { ShoppingCartIcon, MenuIcon, XIcon, LogoIcon } from './Icons';

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = ["Shop", "New Arrivals", "About", "Contact"];

    return (
        <header className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-50 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" className="flex items-center space-x-2">
                            <LogoIcon className="h-8 w-auto" />
                            <span className="text-2xl font-bold text-gray-800">Gemini<span className="text-blue-600">Commerce</span></span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:space-x-8">
                        {navLinks.map((link) => (
                            <a key={link} href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300">
                                {link}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                         {/* Cart Icon */}
                        <button onClick={onCartClick} className="relative text-gray-600 hover:text-blue-600 transition-colors duration-300">
                            <ShoppingCartIcon className="h-7 w-7" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-blue-600">
                                {isMenuOpen ? <XIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

             {/* Mobile Navigation */}
             <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <a key={link} href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
