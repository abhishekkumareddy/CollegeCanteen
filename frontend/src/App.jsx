import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="min-h-screen flex flex-col bg-gray-50 transition-colors duration-300">
                        <Toaster position="top-center" toastOptions={{
                            className: 'font-bold shadow-md rounded-xl border border-gray-100',
                            success: { iconTheme: { primary: '#10b981', secondary: 'white' } },
                            error: { iconTheme: { primary: '#ef4444', secondary: 'white' } }
                        }} />
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/verify-email" element={<VerifyEmail />} />
                                <Route path="/menu" element={<Menu />} />

                                {/* Protected Routes (Logged in users only) */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/orders" element={<Orders />} />
                                </Route>

                                {/* Admin Routes (Admins only) */}
                                <Route element={<AdminRoute />}>
                                    <Route path="/admin" element={<AdminDashboard />} />
                                </Route>
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
