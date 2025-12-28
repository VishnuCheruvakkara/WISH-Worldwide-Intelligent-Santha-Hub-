import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaGift, FaStar } from 'react-icons/fa';

const DashboardPage = () => {
    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-2">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                >
                    Merry Dashboard! 🎄
                </motion.h1>
                <p className="text-gray-400">Welcome to your personal North Pole hub.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Wishes Sent', value: '12', icon: FaGift, color: 'text-santa-red' },
                    { label: 'Pureness Score', value: '98%', icon: FaHeart, color: 'text-pink-500' },
                    { label: 'Magic Collected', value: '2.4k', icon: FaStar, color: 'text-yellow-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon size={24} className={stat.color} />
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Live</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Big Feature Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-santa-red/20 to-transparent border border-santa-red/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
                <div className="relative z-10 max-w-lg">
                    <h2 className="text-3xl font-bold mb-4">The Sleigh is Loading...</h2>
                    <p className="text-gray-300 mb-6 font-light leading-relaxed">
                        Your latest wish for "A world filled with kindness" is currently being processed by our top-tier elves. Stay nice, and you might see it under the tree soon!
                    </p>
                    <button className="bg-santa-red hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-santa-red/20">
                        View Wish Details
                    </button>
                </div>

                {/* Decoration */}
                <FaGift size={200} className="absolute -right-20 -bottom-20 text-white/5 rotate-12" />
            </motion.div>
        </div>
    );
};

export default DashboardPage;
