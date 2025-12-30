import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * AdminRoute - Guards admin routes from unauthorized access
 * 
 * Logic:
 * - If user is NOT authenticated → Redirect to santa-login (admin login)
 * - If user IS authenticated BUT not admin → Redirect to user dashboard
 * - If user IS authenticated AND is admin → Allow access
 */
const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();

    // Not authenticated - redirect to admin login (santa-login)
    if (!isAuthenticated) {
        return <Navigate to="/santa-login" replace state={{ from: location }} />;
    }

    // Authenticated but not admin - redirect to user dashboard
    if (!isAdmin) {
        return <Navigate to="/dashboard" replace state={{ from: location }} />;
    }

    // Admin user - allow access
    return children;
};

export default AdminRoute;
