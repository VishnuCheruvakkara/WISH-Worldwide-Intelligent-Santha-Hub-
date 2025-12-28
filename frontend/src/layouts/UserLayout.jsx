import React from 'react';
import MainLayout from './MainLayout';
import { FaUser, FaGift, FaHistory, FaCog, FaHome } from 'react-icons/fa';

const userMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: FaHome },
    { label: 'My Profile', path: '/profile', icon: FaUser },
    { label: 'My Wishes', path: '/wishes', icon: FaGift },
    { label: 'History', path: '/history', icon: FaHistory },
    { label: 'Settings', path: '/settings', icon: FaCog },
];

const UserLayout = () => {
    return <MainLayout menuItems={userMenuItems} />;
};

export default UserLayout;
