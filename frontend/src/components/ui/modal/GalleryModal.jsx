import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSnowflake, FaTimes } from 'react-icons/fa';

const GalleryModal = ({ isOpen, onClose, title, children, showClose = true }) => {
    if (!isOpen) return null;

    const modal = (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                {/* Backdrop with strong blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                {/* Modal Content - Fixed Size & Scrollable */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl h-[90vh] md:h-[80vh] bg-[#050E3C] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-50"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-santa-red/10 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-santa-red/20 rounded-full flex items-center justify-center">
                                <FaSnowflake className="text-santa-red animate-spin-slow" />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
                        </div>
                        {showClose && (
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-santa-red hover:text-white transition-all cursor-pointer"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                        {children}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );

    return createPortal(modal, document.body);
};

export default GalleryModal;
