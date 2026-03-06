import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-primary">College<span className="text-secondary">Canteen</span></span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-primary transition font-medium">Home</Link>
                        <Link to="/menu" className="text-gray-700 hover:text-primary transition font-medium">Menu</Link>

                        {user ? (
                            <>
                                <Link to="/orders" className="text-gray-700 hover:text-primary transition font-medium">My Orders</Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-gray-700 hover:text-primary transition font-medium">Dashboard</Link>
                                )}
                                <Link to="/cart" className="text-gray-700 hover:text-primary transition relative">
                                    <FaShoppingCart className="text-xl" />
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </Link>
                                <div className="flex items-center gap-2 text-gray-700 border-l border-gray-300 pl-4 py-1">
                                    <div className="bg-gray-100 p-2 rounded-full"><FaUser className="text-sm" /></div>
                                    <span className="font-semibold">{user.name}</span>
                                    <button onClick={handleLogout} className="ml-2 text-gray-500 hover:text-red-500 transition" title="Logout">
                                        <FaSignOutAlt />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-primary transition font-medium">Login</Link>
                                <Link to="/signup" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 transition font-medium shadow-sm">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-primary focus:outline-none">
                            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg absolute w-full left-0 z-40">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md">Home</Link>
                        <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md">Menu</Link>
                        {user ? (
                            <>
                                <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md">My Orders</Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md">Admin Dashboard</Link>
                                )}
                                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md flex justify-between items-center">
                                    Cart
                                    <span className="bg-primary text-white text-xs rounded-full px-2 py-1">{cartItemCount}</span>
                                </Link>
                                <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="w-full text-left block px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                                    Logout ({user.name})
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-orange-50 rounded-md">Login</Link>
                                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-primary hover:bg-orange-50 rounded-md">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
