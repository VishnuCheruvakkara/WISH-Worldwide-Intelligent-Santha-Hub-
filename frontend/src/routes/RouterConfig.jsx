import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/authenticate/LoginPage';
import SignupPage from '../pages/authenticate/SignupPage';
import SantaLoginPage from '../pages/authenticate/SantaLoginPage';
import AboutPage from '../pages/landing/information/AboutPage';
import StoryPage from '../pages/landing/information/StoryPage';
import NotFoundPage from '../pages/error/NotFoundPage';

// Layouts
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages
import DashboardPage from '../pages/dashboard/DashboardPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';

// Route Guards
import { PublicRoute, ProtectedRoute, AdminRoute } from './guards';

const RouterConfig = () => {
    const routes = useRoutes([
        // ═══════════════════════════════════════════════════════════════════
        // PUBLIC ROUTES - Accessible by unauthenticated users only
        // Authenticated users will be redirected to their respective dashboards
        // ═══════════════════════════════════════════════════════════════════
        {
            path: '/',
            element: (
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            )
        },
        {
            path: '/about',
            element: (
                <PublicRoute>
                    <AboutPage />
                </PublicRoute>
            )
        },
        {
            path: '/story',
            element: (
                <PublicRoute>
                    <StoryPage />
                </PublicRoute>
            )
        },
        {
            path: '/login',
            element: (
                <PublicRoute>
                    <LoginPage />
                </PublicRoute>
            )
        },
        {
            path: '/signup',
            element: (
                <PublicRoute>
                    <SignupPage />
                </PublicRoute>
            )
        },
        {
            path: '/santa-login',
            element: (
                <PublicRoute>
                    <SantaLoginPage />
                </PublicRoute>
            )
        },

        // ═══════════════════════════════════════════════════════════════════
        // USER ROUTES - Accessible by authenticated regular users only
        // Unauthenticated users → redirected to login
        // Admin users → redirected to admin dashboard
        // ═══════════════════════════════════════════════════════════════════
        {
            element: (
                <ProtectedRoute>
                    <UserLayout />
                </ProtectedRoute>
            ),
            children: [
                { path: '/dashboard', element: <DashboardPage /> },
                { path: '/profile', element: <div className="p-10 text-center text-2xl">Spirit Profile (Coming Soon)</div> },
                { path: '/wishes', element: <div className="p-10 text-center text-2xl">My Wishes (Coming Soon)</div> },
                { path: '/history', element: <div className="p-10 text-center text-2xl font-bold">Wish History (Coming Soon)</div> },
                { path: '/settings', element: <div className="p-10 text-center text-2xl font-bold text-gray-400">Settings (Coming Soon)</div> },
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // ADMIN ROUTES - Accessible by authenticated admin users only
        // Unauthenticated users → redirected to santa-login
        // Regular users → redirected to user dashboard
        // ═══════════════════════════════════════════════════════════════════
        {
            path: '/admin',
            element: (
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            ),
            children: [
                { path: 'dashboard', element: <AdminDashboardPage /> },
                { path: 'users', element: <div className="p-10 text-center text-2xl text-santa-red">Naughty & Nice List (Restricted)</div> },
                { path: 'wishes', element: <div className="p-10 text-center text-2xl font-bold text-santa-red">Global Wish Moderation</div> },
                { path: 'analytics', element: <div className="p-10 text-center text-2xl font-bold text-white/50">Spiritual Analytics Flow</div> },
                { path: 'settings', element: <div className="p-10 text-center text-2xl font-bold">Sanctum Configuration</div> },
            ]
        },

        // Legacy redirect
        { path: '/admin-dashboard', element: <Navigate to="/admin/dashboard" replace /> },

        // 404 - Not Found (accessible by everyone)
        { path: '*', element: <NotFoundPage /> },
    ]);

    return routes;
};

export default RouterConfig;
