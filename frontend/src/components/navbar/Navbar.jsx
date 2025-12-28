import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSnowflake } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Story', path: '/story' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            {/* Main Header */}
            <div className="relative z-[70] px-6 py-4 flex items-center justify-between backdrop-blur-md bg-santa-navy-dark/90 border-b border-white/5">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-santa-red transition-colors">
                    <FaSnowflake className="text-santa-red animate-spin-slow" />
                    <span className="tracking-tighter">WISH<span className="text-santa-red">.AI</span></span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`transition-colors text-sm font-medium ${location.pathname === link.path ? 'text-santa-red' : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/login">
                        <Button variant="secondary" className="!py-1.5 !px-4 text-xs font-semibold">Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="primary" className="!py-1.5 !px-4 text-xs font-semibold">Join Santa's List</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>

            {/* Mobile Dropdown Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] md:hidden"
                            onClick={toggleMenu}
                        />

                        {/* Drawer Content */}
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                            className="absolute top-full left-0 right-0 bg-santa-navy-dark/80 backdrop-blur-xl border-b border-white/10 z-[65] md:hidden shadow-2xl overflow-hidden"
                        >
                            {/* Decorative Snowflakes */}
                            <div className="absolute top-4 right-4 text-white/5 pointer-events-none">
                                <FaSnowflake size={200} />
                            </div>


                            <div className="px-6 py-6 flex flex-col gap-6">
                                {/* Small, Balanced Links */}
                                <div className="flex flex-col gap-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 px-2">Navigation</p>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={`text-lg py-2 px-2 rounded-lg transition-all duration-300 flex items-center justify-between ${location.pathname === link.path
                                                ? 'text-santa-red bg-santa-red/5 font-semibold'
                                                : 'text-gray-300 active:bg-white/5'
                                                }`}
                                        >
                                            {link.name}
                                            {location.pathname === link.path && <FaSnowflake className="text-[10px]" />}
                                        </Link>
                                    ))}
                                </div>

                                {/* Compact Buttons */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                                    <Link to="/login">
                                        <Button variant="secondary" className="w-full justify-center !py-2.5 !text-sm border-white/10 bg-white/5">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button variant="primary" className="w-full justify-center !py-2.5 !text-sm">
                                            Join List
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
