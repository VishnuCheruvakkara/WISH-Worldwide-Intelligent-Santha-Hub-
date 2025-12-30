import React from 'react';
import MainLayout from './MainLayout';
import { FaUserShield, FaUsers, FaMagic, FaHome, FaCommentDots } from 'react-icons/fa';

const adminMenuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FaHome },
    { label: 'Users', path: '/admin/users', icon: FaUsers },
    { label: 'Wishes', path: '/admin/wishes', icon: FaMagic },
    { label: 'User Chats', path: '/admin/chat', icon: FaCommentDots },
];

const AdminLayout = () => {
    return <MainLayout menuItems={adminMenuItems} />;
};

export default AdminLayout;
