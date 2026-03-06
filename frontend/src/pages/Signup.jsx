import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [navigate, user, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        try {
            await api.post('/auth/signup', { name, email, password });
            setIsSuccess(true);
            toast.success('Registration successful!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        // Redirect to OTP verification screen
        navigate('/verify-email', { state: { email } });
        return null; // Return null while navigating
    }

    return (
        <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden p-10 border border-gray-100">
                <div>
                    <h2 className="text-center text-4xl font-black text-gray-900 tracking-tight">Create Account</h2>
                    <p className="mt-3 text-center text-gray-500 font-medium">
                        Already have an account?{' '}
                        <Link to={`/login?redirect=${redirect}`} className="font-bold text-primary hover:text-orange-600 transition underline decoration-2 underline-offset-4 decoration-primary/30 hover:decoration-primary">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form className="mt-10 space-y-5" onSubmit={submitHandler}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                className="appearance-none block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-white"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="appearance-none block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-white"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-white"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="confirmPassword">Confirm</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-5 py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 hover:bg-white"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
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
                                    Creating Account...
                                </span>
                            ) : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
