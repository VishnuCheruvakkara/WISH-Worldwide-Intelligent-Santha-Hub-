import React from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaUsers, FaMagic, FaChartLine } from 'react-icons/fa';

const AdminDashboardPage = () => {
    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <FaUserShield size={32} className="text-santa-red" />
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-bold bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent"
                    >
                        Santha's Hub
                    </motion.h1>
                </div>
                <p className="text-gray-400">High-level overview of North Pole operations.</p>
            </header>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Active Spirits', value: '1,248', icon: FaUsers, color: 'text-blue-400' },
                    { label: 'Wishes Pending', value: '84', icon: FaMagic, color: 'text-yellow-400' },
                    { label: 'Magic Flow', value: '92%', icon: FaChartLine, color: 'text-green-400' },
                    { label: 'Security Level', value: 'DIVINE', icon: FaUserShield, color: 'text-santa-red' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#050E3C] border border-white/5 rounded-xl p-5 hover:border-santa-red/30 transition-all duration-500"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <stat.icon size={20} className={stat.color} />
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Performance Chart Placeholder */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#050E3C]/50 border border-white/5 rounded-3xl p-8 h-[300px] flex items-center justify-center relative overflow-hidden"
            >
                <div className="text-center z-10">
                    <FaChartLine size={48} className="mx-auto text-white/10 mb-4" />
                    <p className="text-gray-500 font-medium">Spiritual Energy Flow Analytics</p>
                    <p className="text-[10px] text-gray-700 uppercase tracking-widest mt-2">(Restricted Access)</p>
                </div>

                {/* Visual Eye Candy */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,56,56,0.2),transparent_70%)]"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboardPage;
