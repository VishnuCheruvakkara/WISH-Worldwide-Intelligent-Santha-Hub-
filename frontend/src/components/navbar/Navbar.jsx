import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSnowflake, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/button/Button';
import HamburgerMenu from './HamburgerMenu';
import { logoutSuccess } from '../../redux/Slice/userAuthSlice';
import AuthenticateAxios from '../../axios/AuthenticateAxios';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.userAuth);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await AuthenticateAxios.post('/users/logout/');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            dispatch(logoutSuccess());
            navigate('/login');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Story', path: '/story' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            {/* Main Header */}
            <div className="relative z-[70] px-6 py-3 flex items-center justify-between backdrop-blur-md bg-santa-navy-dark/90 border-b border-white/5">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-santa-red transition-colors">
                    <FaSnowflake className="text-santa-red animate-spin-slow" />
                    <span className="tracking-tighter">WISH<span className="text-santa-red">.AI</span></span>
                </Link>

                {!isAuthenticated && (
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
                )}

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                                <FaUser className="text-santa-red" />
                                <span>{user?.username}</span>
                            </div>
                            <Button
                                variant="secondary"
                                className="py-[10px] px-4 text-sm font-semibold flex items-center gap-2"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt />
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="secondary" className="py-[10px] px-4 text-sm font-semibold">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" className="py-[10px] px-4 text-sm font-semibold">Join Santa's List</Button>
                            </Link>
                        </>
                    )}
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
                                {!isAuthenticated && (
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 px-2">Navigation</p>
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                to={link.path}
                                                className={`text-sm font-semibold py-2 px-2 rounded-lg transition-all duration-300 flex items-center justify-between ${location.pathname === link.path
                                                    ? 'text-santa-red bg-santa-red/5 font-semibold'
                                                    : 'text-gray-300 active:bg-white/5'
                                                    }`}
                                            >
                                                {link.name}
                                                {location.pathname === link.path && <FaSnowflake className="text-[10px]" />}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Compact Buttons */}
                                <div className="grid gap-3 pt-4 border-t border-white/5">
                                    {isAuthenticated ? (
                                        <>
                                            <div className="flex items-center justify-between px-2 py-1">
                                                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                                    <FaUser className="text-santa-red" />
                                                    <span>{user?.username}</span>
                                                </div>
                                                <span className="text-[10px] italic text-gray-400">Pure of Heart</span>
                                            </div>
                                            <Button
                                                variant="secondary"
                                                className="w-full justify-center !py-2.5 !text-sm border-white/10 bg-white/5"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/login">
                                                <Button variant="secondary" className="w-full justify-center !py-2.5 !text-sm border-white/10 bg-white/5">
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link to="/signup">
                                                <Button variant="primary" className="w-full justify-center !py-2.5 !text-sm">
                                                    Join Santa's List
                                                </Button>
                                            </Link>
                                        </>
                                    )}
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
