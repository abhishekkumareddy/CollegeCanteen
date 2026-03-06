import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-10 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">College<span className="text-white">Canteen</span></h3>
                        <p className="text-gray-400">
                            Premium food reservation and ordering platform. Fresh ingredients, exquisite taste, delivered to you.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4 text-gray-200">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/" className="hover:text-primary transition">Home</a></li>
                            <li><a href="/menu" className="hover:text-primary transition">Our Menu</a></li>
                            <li><a href="#" className="hover:text-primary transition">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4 text-gray-200">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-gray-700 hover:bg-primary p-3 rounded-full transition duration-300">
                                <FaFacebook />
                            </a>
                            <a href="#" className="bg-gray-700 hover:bg-primary p-3 rounded-full transition duration-300">
                                <FaTwitter />
                            </a>
                            <a href="#" className="bg-gray-700 hover:bg-primary p-3 rounded-full transition duration-300">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} College Canteen. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
