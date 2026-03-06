import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import api from '../api/axiosConfig';

const Menu = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('All');

    const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials'];

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const { data } = await api.get('/foods');
                setFoods(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menu', error);
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    const filteredFoods = categoryFilter === 'All'
        ? foods
        : foods.filter(food => food.category === categoryFilter);

    return (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Our <span className="text-primary">Menu</span></h1>
                <p className="text-lg text-gray-500 font-medium">Discover our culinary creations, made with passion and the finest ingredients.</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                        className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${categoryFilter === category
                                ? 'bg-primary text-white scale-105 shadow-md border border-transparent'
                                : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-primary border border-gray-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                </div>
            ) : filteredFoods.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200 border-dashed">
                    <p className="text-xl text-gray-500 font-medium">No items found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredFoods.map((food, i) => (
                        <div key={food._id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                            <FoodCard food={food} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
