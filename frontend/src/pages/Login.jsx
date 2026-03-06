import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            if (user.role === 'admin' && redirect === '/') {
                navigate('/admin');
            } else {
                navigate(redirect);
            }
        }
    }, [navigate, user, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data);
            toast.success('Welcome back!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden p-10 border border-gray-100">
                <div>
                    <h2 className="text-center text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="mt-3 text-center text-gray-500 font-medium">
                        Don't have an account?{' '}
                        <Link to={`/signup?redirect=${redirect}`} className="font-bold text-primary hover:text-orange-600 transition underline decoration-2 underline-offset-4 decoration-primary/30 hover:decoration-primary">
                            Sign up now
                        </Link>
                    </p>
                </div>

                <form className="mt-10 space-y-6" onSubmit={submitHandler}>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-white"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-white"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white ${isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-primary hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5'} transition-all duration-200`}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
