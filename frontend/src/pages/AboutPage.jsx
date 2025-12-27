import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChristmasScene from '../components/ChristmasScene';
import { FaSnowflake, FaGift, FaHeart, FaMagic } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-santa-navy-dark text-white relative overflow-y-auto">
            <Navbar />

            {/* Christmas Scene Background - Fixed */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <ChristmasScene className="h-full" />
            </div>

            <div className="relative z-10 pt-32 pb-20 container mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-santa-navy/80 border border-white/10 backdrop-blur-sm">
                        <FaSnowflake className="text-santa-red text-xl mr-2 animate-spin-slow" />
                        <span className="text-sm font-semibold tracking-wider uppercase text-gray-300">The Magic Behind the Sleigh</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        About <span className="text-santa-red">W.I.S.H.</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        The <span className="text-white font-semibold">Worldwide Intelligent Santha Hub</span> is the digital nervous system of the North Pole, powered by advanced Elven algorithms and a touch of Christmas magic.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {/* Feature 1 */}
                    <div className="bg-transparent backdrop-blur-sm border border-santa-red/30 p-8 rounded-3xl hover:border-santa-red transition-colors group">
                        <div className="w-14 h-14 bg-santa-red/10 rounded-2xl flex items-center justify-center mb-6 text-santa-red group-hover:scale-110 transition-transform">
                            <FaMagic size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">AI-Powered Magic</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Our proprietary "Spirit Engine" analyzes millions of wishes globally to ensure Santa knows exactly what you want before you even ask.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-transparent backdrop-blur-sm border border-santa-red/30 p-8 rounded-3xl hover:border-santa-red transition-colors group">
                        <div className="w-14 h-14 bg-santa-red/10 rounded-2xl flex items-center justify-center mb-6 text-santa-red group-hover:scale-110 transition-transform">
                            <FaGift size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Global Logistics</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Optimizing sleigh routes in real-time, handling quintillions of delivery variables to guarantee a Christmas morning miracle.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-transparent backdrop-blur-sm border border-santa-red/30 p-8 rounded-3xl hover:border-santa-red transition-colors group">
                        <div className="w-14 h-14 bg-santa-red/10 rounded-2xl flex items-center justify-center mb-6 text-santa-red group-hover:scale-110 transition-transform">
                            <FaHeart size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Pure Christmas Spirit</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Beyond technology, W.I.S.H. is built on the belief that kindness, generosity, and joy are the true operating system of the world.
                        </p>
                    </div>
                </div>

                <div className="bg-transparent border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden backdrop-blur-sm max-w-4xl mx-auto">
                    {/* Subtle glow instead of full gradient background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-santa-navy/40 -z-10"></div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Our Mission</h2>
                    <p className="text-lg text-gray-300 relative z-10 leading-snug">
                        To keep the magic of Christmas alive in the heart of every child and adult, bridging the gap between ancient tradition and modern wonder through the power of connection.
                    </p>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;
