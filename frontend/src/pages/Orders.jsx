import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { FaClock, FaCheckCircle, FaSpinner, FaTimesCircle } from 'react-icons/fa';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/myorders');
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders', error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <FaClock className="text-yellow-500" />;
            case 'preparing': return <FaSpinner className="text-blue-500 animate-spin" />;
            case 'delivered': return <FaCheckCircle className="text-green-500" />;
            case 'cancelled': return <FaTimesCircle className="text-red-500" />;
            default: return <FaClock />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'preparing': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 animate-fade-in max-w-5xl">
            <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">My <span className="text-primary">Orders</span></h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <p className="text-xl text-gray-500 font-medium">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.slice().reverse().map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center bg-gray-50/50 gap-4">
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Order #</p>
                                    <p className="font-mono font-bold text-gray-800">{order._id.substring(order._id.length - 8)}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                                    <p className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total</p>
                                    <p className="font-black text-primary text-lg">${order.totalPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <div className={`px-4 py-2 rounded-full border border-dashed flex items-center gap-2 font-bold capitalize ${getStatusColor(order.orderStatus)}`}>
                                        {getStatusIcon(order.orderStatus)}
                                        {order.orderStatus}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h4 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">Ordered Items</h4>
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                            <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                                                {/* Fallback pattern for images for aesthetic consistency */}
                                                {item.foodId?.image ?
                                                    <img src={item.foodId.image} alt="food" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://source.unsplash.com/100x100/?food' }} />
                                                    : <div className="w-full h-full bg-gray-300"></div>}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-bold text-gray-900">{item.foodId ? item.foodId.name : 'Unknown Item'}</p>
                                                <p className="text-sm text-gray-500 font-medium">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-gray-800">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
