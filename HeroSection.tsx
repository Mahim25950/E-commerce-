
import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <div className="relative bg-gray-900">
            <div className="absolute inset-0">
                <img className="w-full h-full object-cover" src="https://picsum.photos/seed/tech-hero/1920/1080" alt="Modern electronic devices" />
                <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
            </div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                    <span className="block">Discover the Future of Tech</span>
                    <span className="block text-blue-400">Innovation at Your Fingertips</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
                    Explore our curated collection of the latest and greatest gadgets designed to elevate your lifestyle.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-1 sm:gap-5">
                        <a
                            href="#"
                            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105"
                        >
                            Shop New Arrivals
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
