import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/Sidebar';
import MobileBottomNav from '../components/navigation/MobileBottomNav';
import ChristmasScene from '../components/christmas-animation/ChristmasSceneNoSanta';
import { motion } from 'framer-motion';

const MainLayout = ({ menuItems }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-santa-navy-dark text-white flex flex-col overflow-hidden">
            {/* Blurred Christmas Scene Background */}
            <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
                <ChristmasScene />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                <div className="flex flex-1 pt-14 relative">
                    <Sidebar
                        menuItems={menuItems}
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />

                    <motion.main
                        initial={false}
                        animate={{
                            marginLeft: isSidebarOpen ? '260px' : '80px',
                        }}
                        className="hidden md:flex flex-1 flex-col min-h-[calc(100vh-64px)] transition-all duration-300 overflow-hidden"
                        style={{ width: isSidebarOpen ? 'calc(100% - 260px)' : 'calc(100% - 80px)' }}
                    >
                        <div className="flex-1 relative ">
                            <Outlet />
                        </div>
                        <Footer />
                    </motion.main>

                    <main className="flex md:hidden flex-1 flex-col min-h-[calc(100vh-64px)] w-full pb-20 overflow-x-hidden">
                        <div className="flex-1 relative ">
                            <Outlet />
                        </div>
                        <Footer />
                    </main>
                </div>

                <MobileBottomNav menuItems={menuItems} />
            </div>
        </div>
    );
};

export default MainLayout;

