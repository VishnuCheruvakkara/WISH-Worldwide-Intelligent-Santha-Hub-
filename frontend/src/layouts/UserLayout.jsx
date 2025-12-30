import React from 'react';
import MainLayout from './MainLayout';
import { FaGift, FaHome, FaCommentDots } from 'react-icons/fa';

const userMenuItems = [
    { label: 'Gallery', path: '/dashboard', icon: FaHome },
    { label: 'My Wishes', path: '/wishes', icon: FaGift },
    { label: 'Santa Chat', path: '/chat', icon: FaCommentDots },
];

const UserLayout = () => {
    return <MainLayout menuItems={userMenuItems} />;
};

export default UserLayout;
