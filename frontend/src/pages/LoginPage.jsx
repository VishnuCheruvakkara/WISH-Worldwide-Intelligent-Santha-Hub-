import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import Button from '../components/Button';
import Input from '../components/Input';
import Navbar from '../components/Navbar';
import ChristmasScene from '../components/ChristmasScene';

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#050E3C] text-white relative overflow-y-auto">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
                <ChristmasScene className="h-full" />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center py-20 relative z-10">
                <div className="w-full max-w-md p-8">
                    <div className="bg-[#002455]/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Decor */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF3838] rounded-full blur-[60px] opacity-20"></div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                            <p className="text-gray-400 text-sm">Log in to continue your wish journey</p>
                        </div>

                        <form className="space-y-6">
                            <Input
                                label="Email Address"
                                placeholder="santa@northpole.com"
                                type="email"
                                icon={FaEnvelope}
                            />
                            <Input
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                                icon={FaLock}
                            />

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-transparent text-[#FF3838] focus:ring-[#FF3838]" />
                                    <span className="text-gray-400 group-hover:text-white transition-colors">Remember me</span>
                                </label>
                                <a href="#" className="text-[#FF3838] hover:text-[#DC0000] font-medium transition-colors">Forgot Password?</a>
                            </div>

                            <Button className="w-full shadow-lg shadow-[#FF3838]/20">Sign In</Button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or continue with</span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>

                            <button type="button" className="w-full py-3 px-4 bg-white text-gray-900 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                                <FaGoogle className="text-red-500" />
                                Sign in with Google
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-400">
                            Don't have an account?
                            <Link to="/signup" className="text-[#FF3838] hover:text-[#DC0000] font-bold ml-1">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
