import React from 'react';
import MainLayout from './MainLayout';
import { FaUserShield, FaUsers, FaMagic, FaChartBar, FaCogs, FaHome } from 'react-icons/fa';

const adminMenuItems = [
    { label: 'Admin Hub', path: '/admin/dashboard', icon: FaHome },
    { label: 'Naughty & Nice List', path: '/admin/users', icon: FaUsers },
    { label: 'Wish Management', path: '/admin/wishes', icon: FaMagic },
    { label: 'Wish Analytics', path: '/admin/analytics', icon: FaChartBar },
    { label: 'Sanctum Settings', path: '/admin/settings', icon: FaCogs },
];

const AdminLayout = () => {
    return <MainLayout menuItems={adminMenuItems} />;
};

export default AdminLayout;
