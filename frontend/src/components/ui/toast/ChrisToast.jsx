import React from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes, FaSnowflake } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChrisToast = ({ t, type, message }) => {
    const icons = {
        success: <FaCheckCircle className="text-green-400" />,
        error: <FaExclamationCircle className="text-red-400" />,
        info: <FaInfoCircle className="text-blue-400" />,
    };

    const themes = {
        success: "border-green-500/50 bg-[#062d1a]/95 backdrop-blur-xl",
        error: "border-red-500/50 bg-[#2d0a0a]/95 backdrop-blur-xl",
        info: "border-blue-500/50 bg-[#0a1a2d]/95 backdrop-blur-xl",
    };

    // Sub-labels updated to be more neutral/professional Christmas theme
    const subLabels = {
        success: "Delivery Successful",
        error: "Notice",
        info: "Update",
    };

    const handleDismiss = (e) => {
        if (e) e.stopPropagation();
        toast.dismiss(t.id);
    };

    return (
        <AnimatePresence mode="wait">
            {t.visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                    onClick={handleDismiss}
                    className={`
                        flex items-center gap-3 p-4 rounded-2xl border shadow-2xl cursor-pointer 
                        relative overflow-hidden group z-[9999]
                        w-[calc(100vw-32px)] sm:w-80 md:w-96
                        ${themes[type]}
                    `}
                >
                    {/* Background Snowflake Decor */}
                    <div className="absolute -right-4 -bottom-4 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-700 pointer-events-none">
                        <FaSnowflake size={60} />
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 text-xl pointer-events-none drop-shadow-lg">
                        {icons[type]}
                    </div>

                    {/* Message Area */}
                    <div className="flex-grow pointer-events-none pr-4">
                        <p className="text-sm font-bold text-white leading-tight">
                            {message}
                        </p>
                        <div className="text-[10px] text-white/50 uppercase tracking-[0.2em] mt-1 font-medium">
                            {subLabels[type]}
                        </div>
                    </div>

                    {/* Compact Close Button */}
                    <div className="flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                        <FaTimes size={12} className="text-white" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Reusable functions
export const showToast = {
    success: (msg) => toast.custom((t) => <ChrisToast t={t} type="success" message={msg} />, { duration: 3000 }),
    error: (msg) => toast.custom((t) => <ChrisToast t={t} type="error" message={msg} />, { duration: 4000 }),
    info: (msg) => toast.custom((t) => <ChrisToast t={t} type="info" message={msg} />, { duration: 3000 }),
};

export default ChrisToast;
