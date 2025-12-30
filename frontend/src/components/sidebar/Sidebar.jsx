import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    FaHome,
    FaUser,
    FaGift,
    FaHistory,
    FaCog,
    FaChevronLeft,
    FaChevronRight,
    FaSnowflake
} from 'react-icons/fa';

const Sidebar = ({ menuItems, isOpen, toggleSidebar }) => {
    const location = useLocation();
    const { user } = useSelector((state) => state.userAuth);

    return (
        <motion.div
            initial={false}
            animate={{ width: isOpen ? '260px' : '80px' }}
            className="fixed left-0 top-16 h-[calc(100vh-64px)] bg-santa-navy-dark/10 backdrop-blur-sm border-r border-white/10 z-40 hidden md:flex flex-col transition-all duration-300 shadow-[20px_0_50px_rgba(0,0,0,0.3)]"
        >
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-[67px] w-6 h-6 bg-santa-red rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg hover:scale-110 transition-transform active:scale-95 cursor-pointer"
            >
                {isOpen ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
            </button>

            {/* Logo/Header */}
            <div className="h-20 flex items-center px-6 overflow-hidden border-b border-white/5">
                <div className="min-w-[40px] h-10 bg-gradient-to-br from-santa-red to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-santa-red/20">
                    <FaSnowflake className="text-white animate-spin-slow" size={20} />
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-4 font-bold text-lg tracking-wider text-white whitespace-nowrap"
                        >
                            W.I.S.Hub
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-8 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <nav className="px-4 space-y-2">
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={`flex items-center h-12 rounded-xl transition-all duration-300 group ${isActive
                                    ? 'bg-santa-red/20 text-white border border-santa-red/30'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className={`min-w-[48px] flex items-center justify-center ${isActive ? 'text-santa-red' : 'group-hover:text-santa-red'} transition-colors duration-300`}>
                                    <item.icon size={20} />
                                </div>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="font-medium whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Active Indicator Tooltip (when closed) */}
                                {!isOpen && (
                                    <div className="absolute left-full ml-6 px-3 py-2 bg-santa-navy-dark border border-white/10 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-[101]">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* User Profile Summary */}
            <div className="p-4 border-t border-white/5">
                <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} transition-all duration-300`}>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-santa-red font-bold animate-pulse-slow uppercase truncate">
                        {user?.username?.charAt(0) || <FaUser size={14} />}
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="ml-3 overflow-hidden text-ellipsis"
                            >
                                <p className="text-sm font-semibold text-white truncate max-w-[170px]">{user?.username || 'Guest'}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest whitespace-nowrap">Online</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
