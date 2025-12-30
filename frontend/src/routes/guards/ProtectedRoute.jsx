import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * ProtectedRoute - Guards user routes from unauthenticated & admin users
 * 
 * Logic:
 * - If user is NOT authenticated → Redirect to login page
 * - If user IS authenticated AND is admin → Redirect to admin dashboard (admins can't access user pages)
 * - If user IS authenticated AND is regular user → Allow access
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Admin users should not access regular user pages
    // Redirect them to admin dashboard
    if (isAdmin) {
        return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
    }

    // Regular authenticated user - allow access
    return children;
};

export default ProtectedRoute;
