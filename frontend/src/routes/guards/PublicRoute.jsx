import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * PublicRoute - Guards public routes from authenticated users
 * 
 * Logic:
 * - If user is NOT authenticated → Allow access to public page
 * - If user IS authenticated AND is admin → Redirect to admin dashboard
 * - If user IS authenticated AND is regular user → Redirect to user dashboard
 */
const PublicRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAuth();
    const location = useLocation();

    // If authenticated, redirect based on role
    if (isAuthenticated) {
        // Admin users go to admin dashboard
        if (isAdmin) {
            return <Navigate to="/admin/dashboard" replace state={{ from: location }} />;
        }
        // Regular users go to user dashboard
        return <Navigate to="/dashboard" replace state={{ from: location }} />;
    }

    // Not authenticated - allow access to public route
    return children;
};

export default PublicRoute;
