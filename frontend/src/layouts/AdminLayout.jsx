import React from 'react';
import MainLayout from './MainLayout';
import { FaUserShield, FaUsers, FaMagic, FaChartBar, FaCogs, FaHome, FaCommentDots } from 'react-icons/fa';

const adminMenuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FaHome },
    { label: 'Users', path: '/admin/users', icon: FaUsers },
    { label: 'Wishes', path: '/admin/wishes', icon: FaMagic },
    { label: 'User Chats', path: '/admin/chat', icon: FaCommentDots },
    { label: 'Analytics', path: '/admin/analytics', icon: FaChartBar },
    { label: 'Settings', path: '/admin/settings', icon: FaCogs },
];

const AdminLayout = () => {
    return <MainLayout menuItems={adminMenuItems} />;
};

export default AdminLayout;
