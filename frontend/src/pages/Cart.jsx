import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';
import { FaArrowRight, FaShoppingBasket } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const navigate = useNavigate();

    const total = getCartTotal();

    const placeOrderHandler = async () => {
        if (cartItems.length === 0) return;

        setIsPlacingOrder(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    foodId: item.foodId,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice: total
            };

            await api.post('/orders', orderData);
            toast.success('Order placed successfully! Check your orders.');
            clearCart();
            navigate('/orders');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error placing order');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center">
                <div className="w-40 h-40 bg-orange-50 rounded-full flex items-center justify-center mb-8 shrink-0">
                    <FaShoppingBasket className="text-6xl text-primary opacity-50" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Your cart is empty</h2>
                <p className="text-gray-500 text-lg mb-10 max-w-lg font-medium">Looks like you haven't added any delicious items to your cart yet.</p>
                <Link to="/menu" className="bg-primary hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1 inline-flex items-center gap-2">
                    Browse Menu <FaArrowRight />
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">Shopping <span className="text-primary">Cart</span></h1>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-100 mb-6">
                        <div className="p-8">
                            <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-gray-100 pb-4 mb-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
                                <div className="col-span-6">Product</div>
                                <div className="col-span-3 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                                <div className="col-span-1"></div>
                            </div>

                            <div className="space-y-2">
                                {cartItems.map((item) => (
                                    <CartItem key={item.foodId} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-gray-900 rounded-3xl shadow-xl overflow-hidden text-white sticky top-24 border border-gray-800">
                        <div className="p-8">
                            <h2 className="text-2xl font-black mb-8 border-b border-gray-700 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8 text-lg font-medium">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax (Estimated)</span>
                                    <span>${(total * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Delivery Fee</span>
                                    <span>$2.99</span>
                                </div>
                                <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between font-black text-2xl text-white">
                                    <span>Total</span>
                                    <span className="text-primary">${(total + total * 0.08 + 2.99).toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={placeOrderHandler}
                                disabled={isPlacingOrder}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${isPlacingOrder ? 'bg-orange-800 text-orange-200 cursor-not-allowed' : 'bg-primary hover:bg-orange-500 hover:shadow-orange-500/30'
                                    }`}
                            >
                                {isPlacingOrder ? (
                                    <>
                                        <span className="animate-spin h-5 w-5 border-2 border-orange-200 border-t-white rounded-full"></span>
                                        Processing...
                                    </>
                                ) : 'Place Order'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
