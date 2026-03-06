import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import api from '../api/axiosConfig';

const Home = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const { data } = await api.get('/foods');
                setFeaturedFoods(data.slice(0, 4)); // Show top 4 as featured
                setLoading(false);
            } catch (error) {
                console.error('Error fetching foods', error);
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gray-900 mb-16 shadow-2xl">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1920"
                        alt="Hero background"
                        className="w-full h-full object-cover opacity-50 transition-transform duration-10000 hover:scale-105"
                    />
                </div>
                <div className="relative z-10 py-24 px-8 md:py-32 md:px-16 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
                        Experience Culinary <span className="text-primary">Excellence</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl drop-shadow font-light">
                        Reserve your table or order online from our exquisite menu of handcrafted dishes prepared by master chefs.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/menu" className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)]">
                            Explore Menu
                        </Link>
                        <Link to="/login" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 font-bold py-3 px-8 rounded-full transition-all transform hover:-translate-y-1">
                            Book Table
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            <div className="mb-20">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Featured <span className="text-primary">Dishes</span></h2>
                        <p className="text-gray-500 mt-2 text-lg">Handpicked favorites from our executive chef</p>
                    </div>
                    <Link to="/menu" className="hidden sm:block text-primary font-bold hover:text-orange-600 transition group">
                        View full menu <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredFoods.map((food, i) => (
                            <div key={food._id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                <FoodCard food={food} />
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-8 text-center sm:hidden">
                    <Link to="/menu" className="text-primary font-bold text-lg inline-flex items-center gap-2">
                        View full menu &rarr;
                    </Link>
                </div>
            </div>

            {/* Promise Section */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-12 text-center mb-16 border border-orange-200/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-300 via-primary to-orange-300"></div>
                <h2 className="text-3xl font-black text-gray-900 mb-6 drop-shadow-sm">Our Promise</h2>
                <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
                    We source only the freshest, highest quality ingredients from local farmers and authentic producers. Every dish is a labor of love, prepared to perfection and delivered hot to your exact specifications. Your satisfaction is not just our goal; it's our guarantee.
                </p>
            </div>
        </div>
    );
};

export default Home;
