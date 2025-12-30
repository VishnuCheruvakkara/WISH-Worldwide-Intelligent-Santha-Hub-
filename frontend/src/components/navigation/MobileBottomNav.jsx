import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MobileBottomNav = ({ menuItems }) => {
    const location = useLocation();
    const displayItems = menuItems.slice(0, 5);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <div className="bg-[#050E3C]/98 backdrop-blur-xl border-t border-white/10 px-2 py-2 safe-area-bottom">
                <div className="flex items-center justify-around">
                    {displayItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className="flex-1 flex flex-col items-center py-1 relative"
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-santa-red rounded-full"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <div className={`p-2 rounded-xl transition-all duration-200 ${isActive ? 'bg-santa-red/20' : ''}`}>
                                    <item.icon
                                        size={20}
                                        className={`transition-colors duration-200 ${isActive ? 'text-santa-red' : 'text-gray-500'}`}
                                    />
                                </div>
                                <span className={`text-[10px] mt-0.5 font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                    {item.label.length > 10 ? item.label.split(' ')[0] : item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default MobileBottomNav;
