import React from 'react';
import { FaSnowflake, FaGift, FaStar, FaGlobe, FaLightbulb, FaHeart, FaNetworkWired } from 'react-icons/fa';
import Button from '../../components/ui/button/Button';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ChristmasScene from '../../components/christmas-animation/ChristmasScene';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const LandingPage = () => {


    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen text-white relative font-sans overflow-x-hidden">
            <Navbar />

            {/* CHRISTMAS SCENE COMPONENT */}
            <ChristmasScene />

            {/* SPACER to show Christmas Scene initially */}
            <div className="h-screen pointer-events-none"></div>

            {/* CONTENT WRAPPER - Always rendered for normal scroll */}
            <div className="relative z-20">
                {/* WISH ACRONYM SECTION */}
                <section
                    className="py-12 md:py-24 bg-santa-navy-dark relative shadow-[0_-50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                >

                    {/* Top Gradient for blending with Christmas Scene */}
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>

                    <div className="container mx-auto px-6 relative z-20">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold mb-4">What is <span className="text-santa-red">W.I.S.H.</span>?</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">More than just an app WISH ( Worldwide Intelligent Santha Hub ), it represents our mission to connect hearts globally through intelligent compassion.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { letter: 'W', word: 'Worldwide', icon: FaGlobe, desc: "Connecting dreamers from every corner of the globe." },
                                { letter: 'I', word: 'Intelligent', icon: FaLightbulb, desc: "Powered by advanced empathetic AI to understand you." },
                                { letter: 'S', word: 'Santha', icon: FaHeart, desc: " embodying the timeless spirit of giving and benevolence." },
                                { letter: 'H', word: 'Hub', icon: FaNetworkWired, desc: "The central place where magic meets technology." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-2 group"
                                >
                                    <div className="w-12 h-12 bg-santa-red/10 rounded-lg flex items-center justify-center text-santa-red mb-6 group-hover:bg-santa-red group-hover:text-white transition-colors">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        <span className="text-santa-red">{item.letter}</span>{item.word.substring(1)}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Background Decor - Fixed */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
                    <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-santa-navy rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                </div>

                <main className="relative z-10 bg-santa-navy-dark">
                    {/* HERO SECTION */}
                    <section className="min-h-screen flex items-center justify-center pt-20 md:pt-32 pb-12 md:pb-20 px-6 container mx-auto overflow-hidden">
                        <div className="flex flex-col lg:flex-row items-center gap-16">

                            {/* Text Content */}
                            <motion.div
                                className="flex-1 space-y-8"
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >
                                <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
                                    Believe in <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">The Magic</span> of <br />
                                    <span className="text-santa-red">AI Santha</span>
                                </motion.h1>

                                <motion.p variants={fadeIn} className="text-lg text-gray-400 max-w-xl leading-relaxed">
                                    Experience the joy of Christmas with a modern twist. Chat with Santa, manage your wishlists, and track your gifts in real-time with our intelligent holiday companion.
                                </motion.p>

                                <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
                                    <Link to="/signup">
                                        <Button>Start Your Wishlist</Button>
                                    </Link>
                                    <Button variant="secondary" className="gap-2">
                                        <FaGift className="text-santa-red" />
                                        How it Works
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Hero Visual/Card */}
                            <motion.div
                                className="flex-1 w-full max-w-lg lg:max-w-none"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <div className="relative bg-santa-navy/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-float transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                                    <div className="absolute -top-12 -right-12 text-santa-red/20 animate-spin-slow">
                                        <FaSnowflake size={140} />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-santa-red shadow-lg">
                                                {/* Placeholder for Santa Portrait */}
                                                <img src="/images/characters/santa_portrait.png" alt="AI Santa" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">Santha AI</h3>
                                                <p className="text-sm text-green-400 flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                                    Online & Listening
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                            <div className="bg-white/5 p-4 rounded-xl rounded-tl-none border border-white/5 max-w-[85%]">
                                                <p className="text-sm text-gray-300">Ho Ho Ho! Greetings, my dear child. The stars are shining bright tonight. What is your heart's desire?</p>
                                            </div>
                                            <div className="bg-santa-red/20 p-4 rounded-xl rounded-tr-none border border-santa-red/20 max-w-[85%] ml-auto">
                                                <p className="text-sm text-white">I really want to build something that makes people happy.</p>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-xl rounded-tl-none border border-white/5 max-w-[85%]">
                                                <p className="text-sm text-gray-300">A noble wish indeed! Creativity is a gift that keeps on giving. I shall guide you on this path. 🌟</p>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <div className="h-12 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 text-gray-500 text-sm">
                                                Write a message to Santa...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </main>
            </div>

            {/* Background Decor - Fixed */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-20">
                <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-santa-navy rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-santa-red-dark rounded-full blur-[150px] opacity-20 animate-pulse delay-1000"></div>
            </div>

            <Footer />
        </div >
    );
};

export default LandingPage;
