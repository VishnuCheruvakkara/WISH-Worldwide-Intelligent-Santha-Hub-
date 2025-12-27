import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/authenticate/LoginPage';
import SignupPage from '../pages/authenticate/SignupPage';
import SantaLoginPage from '../pages/authenticate/SantaLoginPage';
import AboutPage from '../pages/landing/information/AboutPage';
import StoryPage from '../pages/landing/information/StoryPage';

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
        path: '/story',
        element: <StoryPage />,
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
