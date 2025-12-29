import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaTimes } from 'react-icons/fa';

const ChristmasModal = ({ isOpen, onClose, onConfirm, title, children, confirmText = "Confirm", cancelText = "Cancel" }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-[#050E3C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Decorative Header Background */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-santa-red/20 to-transparent pointer-events-none" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
                    >
                        <FaTimes size={20} />
                    </button>

                    <div className="p-8 relative z-10 text-center">
                        <div className="mx-auto w-16 h-16 bg-santa-red/10 rounded-full flex items-center justify-center mb-6">
                            <FaSnowflake className="text-santa-red text-2xl animate-spin-slow" />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

                        <div className="text-white/70 mb-8 leading-relaxed">
                            {children}
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-all font-medium"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-6 py-2.5 rounded-xl bg-santa-red hover:bg-red-600 text-white shadow-lg shadow-santa-red/20 hover:shadow-santa-red/40 transition-all font-bold transform active:scale-95"
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ChristmasModal;
