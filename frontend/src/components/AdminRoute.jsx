import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    // Ensure user exists and has 'admin' role
    return (user && user.role === 'admin') ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
