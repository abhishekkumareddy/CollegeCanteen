import React, { useState } from 'react';
import { useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // If no email in state, they probably navigated here directly, so send them to signup
    if (!email) {
        return <Navigate to="/signup" />;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error('Please enter a 6-digit valid OTP');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await api.post('/auth/verify-email', { email, otp });
            setIsSuccess(true);
            toast.success(data.message || 'Email verified successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden p-10 border border-gray-100 text-center">

                {isSuccess ? (
                    <div className="flex flex-col items-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6 border-4 border-white shadow-sm">
                            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Email Verified!</h2>
                        <p className="text-gray-500 mb-8 font-medium">Your account has been successfully verified.</p>
                        <Link to="/login" className="bg-primary hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md w-full block">
                            Login to Continue
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 mb-6 border-4 border-white shadow-sm">
                            <svg className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Check your email</h2>
                        <p className="text-gray-500 mb-8 font-medium">
                            We sent a 6-digit OTP code to <strong className="text-gray-800">{email}</strong>.
                        </p>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    maxLength="6"
                                    required
                                    className="appearance-none block w-full px-5 py-4 text-center text-2xl tracking-widest font-mono border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} // only allow digits
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || otp.length !== 6}
                                className={`w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white ${isLoading || otp.length !== 6 ? 'bg-orange-400 cursor-not-allowed' : 'bg-primary hover:bg-orange-600 shadow-md'} transition-all`}
                            >
                                {isLoading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default VerifyEmail;
