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
import MyWishesPage from '../pages/wishes/MyWishesPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import SanthaWishesPage from '../pages/admin/SanthaWishesPage';
import SantaChatPage from '../pages/chat/SantaChatPage';
import AdminChatListPage from '../pages/admin/AdminChatListPage';
import AdminUserChatPage from '../pages/admin/AdminUserChatPage';
import AdminUserManagementPage from '../pages/admin/AdminUserManagementPage';

// Route Guards
import { PublicRoute, ProtectedRoute, AdminRoute } from './guards';

const RouterConfig = () => {
    const routes = useRoutes([
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
        {
            element: (
                <ProtectedRoute>
                    <UserLayout />
                </ProtectedRoute>
            ),
            children: [
                { path: '/dashboard', element: <DashboardPage /> },
                { path: '/profile', element: <div className="p-10 text-center text-2xl">Spirit Profile (Coming Soon)</div> },
                { path: '/wishes', element: <MyWishesPage /> },
                { path: '/chat', element: <SantaChatPage /> },
                { path: '/history', element: <div className="p-10 text-center text-2xl font-bold">Wish History (Coming Soon)</div> },
                { path: '/settings', element: <div className="p-10 text-center text-2xl font-bold text-gray-400">Settings (Coming Soon)</div> },
            ]
        },
        {
            path: '/admin',
            element: (
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            ),
            children: [
                { path: 'dashboard', element: <AdminDashboardPage /> },
                { path: 'users', element: <AdminUserManagementPage /> },
                { path: 'wishes', element: <SanthaWishesPage /> },
                { path: 'chat', element: <AdminChatListPage /> },
                { path: 'chat/:userId', element: <AdminUserChatPage /> },
                { path: 'analytics', element: <div className="p-10 text-center text-2xl font-bold text-white/50">Spiritual Analytics Flow</div> },
                { path: 'settings', element: <div className="p-10 text-center text-2xl font-bold">Sanctum Configuration</div> },
            ]
        },
        { path: '/admin-dashboard', element: <Navigate to="/admin/dashboard" replace /> },
        { path: '*', element: <NotFoundPage /> },
    ]);

    return routes;
};

export default RouterConfig;
