import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaExpandAlt, FaTimes } from 'react-icons/fa';

const GalleryPhoto = ({ item }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, rotate: -1 }}
                className="group relative"
            >
                {/* Photo Frame - "Stamp/Polaroid" design */}
                <div className="bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-200 relative">
                    <div className="aspect-square overflow-hidden relative group-hover:cursor-pointer " onClick={() => setIsZoomed(true)}>
                        <img
                            src={item.image_url}
                            alt={item.caption}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-santa-red shadow-xl scale-0 group-hover:scale-100 transition-transform">
                                <FaExpandAlt />
                            </div>
                        </div>
                    </div>

                    {/* Content below image */}
                    <div className="mt-4 px-1 pb-2">
                        <FaQuoteLeft className="text-santa-red text-xs mb-1" />
                        <p className="text-santa-red text-xs font-medium line-clamp-2 italic leading-relaxed">
                            {item.caption}
                        </p>
                        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[9px] text-gray-900 font-bold uppercase tracking-tighter">
                                {item.username}
                            </span>
                            <span className="text-[8px] text-gray-600 font-mono">
                                #{item.id.toString().padStart(4, '0')}
                            </span>
                        </div>
                    </div>

                    {/* Stamp-like Serrated Edges using CSS (Simplified with absolute circles or just sharp edges) */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#050E3C] rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#050E3C] rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#050E3C] rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#050E3C] rounded-full"></div>
                </div>
            </motion.div>

            {/* Zoom View - Stamp View with Rotation */}
            <AnimatePresence>
                {isZoomed && (
                    <div
                        className="fixed inset-0 z-[200000] flex items-center justify-center p-4"
                        onClick={() => setIsZoomed(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
                            animate={{ scale: 1, rotate: 2, opacity: 1 }} // Slight rotation as requested
                            exit={{ scale: 0.5, rotate: 15, opacity: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-[90vw] max-h-[90vh] bg-white p-6 shadow-2xl"
                        >
                            <button
                                onClick={() => setIsZoomed(false)}
                                className="absolute -top-10 right-0 text-white text-2xl hover:text-santa-red transition-colors"
                            >
                                <FaTimes />
                            </button>

                            <div className="relative border-4 border-gray-100 p-1">
                                <img
                                    src={item.image_url}
                                    alt={item.caption}
                                    className="max-w-full max-h-[70vh] object-contain shadow-sm"
                                />
                            </div>

                            <div className="mt-6 text-center px-4 max-w-lg mx-auto">
                                <FaQuoteLeft className="text-santa-red text-2xl mb-4 mx-auto opacity-20" />
                                <p className="text-2xl font-serif italic text-gray-800 leading-snug">
                                    "{item.caption}"
                                </p>
                                <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
                                    Captured by {item.username}
                                </p>
                            </div>

                            {/* Corner dots for stamp look in zoom */}
                            <div className="absolute -top-3 -left-3 w-6 h-6 bg-black rounded-full"></div>
                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-black rounded-full"></div>
                            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-black rounded-full"></div>
                            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-black rounded-full"></div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GalleryPhoto;
