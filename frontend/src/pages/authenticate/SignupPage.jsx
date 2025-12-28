import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Navbar from '../../components/navbar/Navbar';
import ChristmasScene from '../../components/christmas-animation/ChristmasScene';

const SignupPage = () => {
    return (
        <div className="min-h-screen bg-santa-navy-dark text-white relative overflow-x-hidden">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-80 pointer-events-none">
                <ChristmasScene className="h-full" />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center py-12 md:py-20 relative z-10 pt-24 px-2 sm:px-4">
                <div className="w-full max-w-md p-0 sm:p-2">
                    <div className="bg-[#002455]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                        {/* Decor */}
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#DC0000] rounded-full blur-[60px] opacity-20"></div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Join the Magic</h2>
                            <p className="text-gray-400 text-sm">Create an account to start wishing</p>
                        </div>

                        <form className="space-y-5">
                            <Input
                                label="Full Name"
                                placeholder="Elf Buddy"
                                type="text"
                                icon={FaUser}
                            />
                            <Input
                                label="Email Address"
                                placeholder="buddy@northpole.com"
                                type="email"
                                icon={FaEnvelope}
                            />
                            <Input
                                label="Password"
                                placeholder="Create a strong password"
                                type="password"
                                icon={FaLock}
                            />

                            <div className="text-xs text-gray-400">
                                By signing up, you agree to our <a href="#" className="text-[#FF3838]">Terms of Service</a> and <a href="#" className="text-[#FF3838]">Privacy Policy</a>. Nothing naughty!
                            </div>

                            <Button className="w-full shadow-lg shadow-santa-red/20">Create Account</Button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Or join with</span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>

                            <button type="button" className="w-full py-3 px-4 bg-white text-gray-900 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                                <FaGoogle className="text-red-500" />
                                Sign up with Google
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-400">
                            Already have an account?
                            <Link to="/login" className="text-[#FF3838] hover:text-[#DC0000] font-bold ml-1">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
