import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/Sidebar';
import { motion } from 'framer-motion';

const MainLayout = ({ menuItems }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-santa-navy-dark text-white flex flex-col">
            {/* Header / Navbar */}
            <Navbar />

            {/* Main Wrapper */}
            <div className="flex flex-1 pt-16 relative"> {/* pt-16 to account for fixed navbar height */}

                {/* Sidebar */}
                <Sidebar
                    menuItems={menuItems}
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                />

                {/* Content Area */}
                <motion.main
                    initial={false}
                    animate={{
                        marginLeft: isSidebarOpen ? '260px' : '80px',
                        width: isSidebarOpen ? 'calc(100% - 260px)' : 'calc(100% - 80px)'
                    }}
                    className="flex-1 flex flex-col min-h-[calc(100vh-64px)] transition-all duration-300 overflow-hidden"
                >
                    {/* Page Content */}
                    <div className="flex-1 p-6 md:p-10 relative">
                        <Outlet />
                    </div>

                    {/* Footer - at bottom of content */}
                    <Footer />
                </motion.main>
            </div>
        </div>
    );
};

export default MainLayout;
