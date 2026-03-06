import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'foods', 'add-food'
    const [orders, setOrders] = useState([]);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    // New food state
    const [newFood, setNewFood] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Main Course',
        image: ''
    });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'orders') {
                const { data } = await api.get('/orders');
                setOrders(data);
            } else if (activeTab === 'foods') {
                const { data } = await api.get('/foods');
                setFoods(data);
            }
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { orderStatus: newStatus });
            toast.success('Order status updated');
            fetchData(); // Refresh orders
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleAddFood = async (e) => {
        e.preventDefault();
        try {
            await api.post('/foods', newFood);
            toast.success('Food item added successfully');
            setNewFood({ name: '', price: '', description: '', category: 'Main Course', image: '' });
            setActiveTab('foods');
        } catch (error) {
            toast.error('Failed to add food');
        }
    };

    const handleDeleteFood = async (foodId) => {
        if (window.confirm('Are you sure you want to delete this food item?')) {
            try {
                await api.delete(`/foods/${foodId}`);
                toast.success('Food deleted');
                fetchData(); // Refresh foods
            } catch (error) {
                toast.error('Failed to delete food');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Admin <span className="text-primary">Dashboard</span></h1>

            {/* Tabs */}
            <div className="flex overflow-x-auto space-x-2 mb-8 bg-gray-100 p-2 rounded-xl w-max">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'orders' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
                >
                    Manage Orders
                </button>
                <button
                    onClick={() => setActiveTab('foods')}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'foods' ? 'bg-white shadow-sm text-primary' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
                >
                    Manage Foods
                </button>
                <button
                    onClick={() => setActiveTab('add-food')}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all ${activeTab === 'add-food' ? 'bg-green-500 text-white shadow-sm' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                    + Add New Food
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-10 border border-gray-100 min-h-[500px]">
                {loading && activeTab !== 'add-food' ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="overflow-x-auto">
                                {orders.length === 0 ? (
                                    <p className="text-center text-gray-500 py-10 font-bold">No orders found.</p>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-gray-100">
                                                <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Order ID</th>
                                                <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">User</th>
                                                <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Date</th>
                                                <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Total</th>
                                                <th className="p-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Status & Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {orders.slice().reverse().map((order) => (
                                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-4 py-6 font-mono font-semibold text-gray-800 text-sm">...{order._id.slice(-6)}</td>
                                                    <td className="p-4 font-medium text-gray-800">{order.userId ? order.userId.name : 'Unknown User'}</td>
                                                    <td className="p-4 font-medium text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td className="p-4 font-bold text-primary">${order.totalPrice.toFixed(2)}</td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                                                                    order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                                        order.orderStatus === 'preparing' ? 'bg-blue-100 text-blue-700' :
                                                                            'bg-yellow-100 text-yellow-700'
                                                                }`}>
                                                                {order.orderStatus}
                                                            </span>
                                                            <select
                                                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary px-3 py-1.5 font-medium shadow-sm outline-none"
                                                                value={order.orderStatus}
                                                                onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                                            >
                                                                <option value="pending">Mark Pending</option>
                                                                <option value="preparing">Mark Preparing</option>
                                                                <option value="delivered">Mark Delivered</option>
                                                                <option value="cancelled">Mark Cancelled</option>
                                                            </select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* Foods Tab */}
                        {activeTab === 'foods' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {foods.length === 0 ? (
                                    <p className="col-span-full text-center py-10 font-bold text-gray-500">No foods found.</p>
                                ) : (
                                    foods.map((food) => (
                                        <div key={food._id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                                            <div className="h-40 bg-gray-200">
                                                <img
                                                    src={food.image === 'no-photo.jpg' ? `https://source.unsplash.com/400x300/?${food.category}` : food.image}
                                                    alt={food.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.src = 'https://source.unsplash.com/400x300/?food'; }}
                                                />
                                            </div>
                                            <div className="p-5">
                                                <h4 className="font-extrabold text-gray-900 text-lg mb-1">{food.name}</h4>
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-primary font-bold">${food.price.toFixed(2)}</span>
                                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-bold uppercase">{food.category}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteFood(food._id)}
                                                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-2 rounded-xl transition"
                                                >
                                                    Delete Item
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Add Food Tab */}
                        {activeTab === 'add-food' && (
                            <div className="max-w-2xl mx-auto py-4">
                                <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Add New Food Item</h2>
                                <form onSubmit={handleAddFood} className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Food Name</label>
                                            <input
                                                type="text" required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition bg-white"
                                                value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                                            <input
                                                type="number" step="0.01" required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition bg-white"
                                                value={newFood.price} onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <select
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition bg-white font-medium"
                                            value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                                        >
                                            <option value="Appetizers">Appetizers</option>
                                            <option value="Main Course">Main Course</option>
                                            <option value="Desserts">Desserts</option>
                                            <option value="Beverages">Beverages</option>
                                            <option value="Specials">Specials</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Image URL (Optional)</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition bg-white text-sm"
                                            placeholder="https://example.com/image.jpg"
                                            value={newFood.image} onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            required rows="4"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition bg-white"
                                            value={newFood.description} onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        Save Food Item
                                    </button>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
