import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHatCowboy, FaStar, FaScroll, FaMagic } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Navbar from '../../components/navbar/Navbar';
import ChristmasScene from '../../components/christmas-animation/ChristmasScene';

const SantaLoginPage = () => {
    const navigate = useNavigate();
    const [secretCode, setSecretCode] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, this would validate against a backend
        if (secretCode === 'hohoho' || secretCode === 'admin') {
            alert("Welcome Santa! The sleigh is ready.");
            // navigate('/santa-dashboard'); 
        } else {
            alert("This code selection feels... lacking in spirit. Try again!");
        }
    };

    return (
        <div className="min-h-screen bg-santa-navy-dark text-white relative overflow-y-auto">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
                <ChristmasScene className="h-full" />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center py-20 relative z-10 pt-24">
                <div className="w-full max-w-md p-8">
                    <div className="bg-santa-navy/80 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">

                        {/* Decor - Divine Gold Glow */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-santa-red rounded-full blur-[60px] opacity-10"></div>

                        <div className="text-center mb-8 relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-santa-red to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30 text-white shadow-lg">
                                <FaMagic size={32} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2 text-white">Santa's Sanctum</h2>
                            <p className="text-gray-300 text-sm">Enter the Magic Code</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                            <Input
                                label="Name of Spirit"
                                placeholder="St. Nicholas"
                                type="text"
                                icon={FaStar}
                            />
                            <Input
                                label="Secret Scroll Code"
                                placeholder="••••••••"
                                type="password"
                                icon={FaScroll}
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                            />

                            <Button className="w-full shadow-lg shadow-yellow-500/20 border border-white/20 bg-gradient-to-r from-santa-red to-red-600 hover:from-red-600 hover:to-santa-red">
                                Unlock the Magic
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <span className="text-xs text-yellow-200/60 uppercase tracking-widest font-serif">Only for the pure of heart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SantaLoginPage;
