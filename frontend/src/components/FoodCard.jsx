import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaCartPlus } from 'react-icons/fa';

const FoodCard = ({ food }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!user) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }
        addToCart(food);
        toast.success(`${food.name} added to cart!`);
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full">
            <div className="relative h-56 overflow-hidden bg-gray-200 rounded-t-2xl">
                {/* Placeholder image logic: In real app, food.image would be a real URL */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                    src={food.image === 'no-photo.jpg' ? `https://source.unsplash.com/600x400/?${encodeURIComponent(food.category || 'food')}` : food.image}
                    alt={food.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600&h=400'; }}
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 px-3 py-1 rounded-full uppercase tracking-wider">
                        {food.category}
                    </span>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{food.name}</h3>
                    <span className="text-lg font-extrabold text-primary">${food.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{food.description}</p>

                <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full py-3 rounded-xl font-semibold bg-gray-50 text-gray-800 border border-gray-200 hover:bg-primary hover:text-white hover:border-transparent transition flex items-center justify-center gap-2 group/btn"
                >
                    <FaCartPlus className="group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
