import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CustomSelect = ({ options, value, onChange, icon: Icon, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {/* Trigger Button - Perfect for all screen sizes */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full flex items-center justify-between gap-3 px-4 py-[14px]  bg-white/5 border cursor-pointer border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white text-left focus:outline-none focus:ring-2 focus:ring-santa-red/50"
            >
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    {Icon && <Icon className="text-white/50 flex-shrink-0 text-base" />}
                    <span className="truncate text-xs font-medium">{selectedOption.label}</span>
                </div>
                <FaChevronDown className={`text-xs text-white/50 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu - Perfect positioning */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-[#0F172A] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full cursor-pointer flex items-center gap-2.5 px-4 py-3 text-left hover:bg-white/10 transition-all duration-150
                                    ${value === option.value ? 'text-santa-red font-bold bg-white/5' : 'text-white/80'}
                                `}
                            >
                                {option.icon && <option.icon className="flex-shrink-0 text-base" />}
                                <span className="text-xs">{option.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;