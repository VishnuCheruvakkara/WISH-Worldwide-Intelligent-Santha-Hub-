import React from 'react';
import { motion } from 'framer-motion';

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
    return (
        <button
            onClick={toggleMenu}
            className="md:hidden relative z-[70] w-8 h-8 flex flex-col justify-center items-center focus:outline-none"
            aria-label="Toggle Menu"
        >
            <div className="relative w-6 h-5">
                {/* Top Bar */}
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 9, x: 0 } : { rotate: 0, y: 0, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-white rounded-full"
                    style={{ originX: "center", originY: "center" }}
                />
                {/* Middle Bar */}
                <motion.span
                    animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[9px] left-0 w-full h-[2px] bg-white rounded-full"
                />
                {/* Bottom Bar */}
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -9, x: 0 } : { rotate: 0, y: 0, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full"
                    style={{ originX: "center", originY: "center" }}
                />
            </div>
        </button>
    );
};

export default HamburgerMenu;
