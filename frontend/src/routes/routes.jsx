import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SantaLoginPage from '../pages/SantaLoginPage';
import AboutPage from '../pages/AboutPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        path: '/santa-login',
        element: <SantaLoginPage />,
    },
]);

export default router;
