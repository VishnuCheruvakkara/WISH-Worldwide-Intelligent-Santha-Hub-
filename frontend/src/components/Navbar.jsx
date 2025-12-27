import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSnowflake } from 'react-icons/fa';
import Button from './Button';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#050E3C]/80 border-b border-white/5">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-[#FF3838] transition-colors">
                <FaSnowflake className="text-[#FF3838] animate-spin-slow" />
                <span className="tracking-tighter">WISH<span className="text-[#FF3838]">.AI</span></span>
            </Link>

            <div className="flex items-center gap-8">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Santa</Link>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login">
                    <Button variant="secondary" className="!py-2 !px-5 text-sm">Login</Button>
                </Link>
                <Link to="/signup">
                    <Button variant="primary" className="!py-2 !px-5 text-sm">Join Santa's List</Button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
