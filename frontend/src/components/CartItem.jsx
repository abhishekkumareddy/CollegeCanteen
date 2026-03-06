import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateQuantity(item.foodId, item.quantity - 1);
        } else {
            removeFromCart(item.foodId);
        }
    };

    const handleIncrease = () => {
        updateQuantity(item.foodId, item.quantity + 1);
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 py-6 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                        src={item.image === 'no-photo.jpg' ? `https://source.unsplash.com/100x100/?food` : item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=100&h=100'; }}
                    />
                </div>
                <div className="flex-grow">
                    <h4 className="text-lg font-bold text-gray-800">{item.name}</h4>
                    <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                <div className="flex items-center bg-gray-100 rounded-full px-1 py-1">
                    <button
                        onClick={handleDecrease}
                        className="w-8 h-8 rounded-full bg-white text-gray-600 hover:text-primary flex items-center justify-center shadow-sm transition"
                    >
                        <FaMinus className="text-xs" />
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-800">{item.quantity}</span>
                    <button
                        onClick={handleIncrease}
                        className="w-8 h-8 rounded-full bg-white text-gray-600 hover:text-primary flex items-center justify-center shadow-sm transition"
                    >
                        <FaPlus className="text-xs" />
                    </button>
                </div>

                <div className="text-right sm:w-24">
                    <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                    onClick={() => removeFromCart(item.foodId)}
                    className="text-gray-400 hover:text-red-500 p-2 transition"
                    title="Remove item"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
