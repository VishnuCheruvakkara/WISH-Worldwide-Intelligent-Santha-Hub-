import React from 'react';
import { FaLinkedin, FaYoutube, FaInstagram, FaGithub, FaSnowflake } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-santa-navy-dark text-white pt-20 pb-10 border-t border-white/10 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-santa-navy rounded-full blur-[120px] opacity-40"></div>
                <div className="absolute bottom-[-10%] right-[20%] w-96 h-96 bg-santa-red-dark rounded-full blur-[120px] opacity-20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-santa-red transition-colors">
                            <FaSnowflake className="text-santa-red animate-spin-slow" />
                            <span className="tracking-tighter">WISH<span className="text-santa-red">.AI</span></span>
                        </Link>
                        <div className="space-y-1 text-sm text-gray-400 font-medium">
                            <p><span className="text-white">W</span>orldwide</p>
                            <p><span className="text-white">I</span>ntelligent</p>
                            <p><span className="text-white">S</span>antha</p>
                            <p><span className="text-white">H</span>ub</p>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Bringing the magic of Christmas to the digital age with AI-powered wish fulfillment and guidance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Explore</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link to="/" className="hover:text-[#FF3838] transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-[#FF3838] transition-colors">About</Link></li>
                            <li><Link to="/story" className="hover:text-[#FF3838] transition-colors">Story</Link></li>
                            <li><Link to="/wishes" className="hover:text-[#FF3838] transition-colors">Wishlist</Link></li>
                            <li><Link to="/login" className="hover:text-[#FF3838] transition-colors">Login / Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Legal</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-[#FF3838] transition-colors">Santa's Code</a></li>
                            <li><a href="#" className="hover:text-[#FF3838] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#FF3838] transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Social & Credits */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Connect</h4>
                        <div className="flex gap-4 mb-6 flex-wrap">
                            {[FaLinkedin, FaYoutube, FaInstagram, FaGithub].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 
                 flex items-center justify-center 
                 transition-all text-white
                 hover:bg-santa-red hover:scale-110"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                        <div className="text-sm text-gray-500">
                            <p>Designed & Developed by</p>
                            <p className="text-white font-semibold mt-1">Vishnu Cheruvakkara</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>© {new Date().getFullYear()} WISH. All rights reserved by North Pole Tech.</p>
                    <p className="flex items-center gap-2">
                        Made with <span className="text-[#FF3838]">❤</span> and Christmas Spirit
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
