import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCompass, FaHome, FaSnowflake } from 'react-icons/fa';
import ChristmasScene from '../../components/christmas-animation/ChristmasScene';
import Button from '../../components/ui/button/Button';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-santa-navy-dark text-white flex items-center justify-center relative overflow-x-hidden">
            {/* Background Magic */}
            <div className="absolute inset-0 z-0">
                <ChristmasScene />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Icon / Visual */}
                    <div className="relative inline-block">
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-santa-red drop-shadow-[0_0_30px_rgba(234,67,53,0.4)]"
                        >
                            <FaCompass size={120} />
                        </motion.div>
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-4 -right-4 text-white"
                        >
                            <FaSnowflake size={40} />
                        </motion.div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                            404
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Ho Ho... <span className="text-santa-red">Oh No!</span>
                        </h2>
                        <p className="text-gray-300 max-w-md mx-auto text-lg leading-relaxed">
                            It seems you've wandered off the trail to the North Pole. Even Rudolph's nose couldn't find this page!
                        </p>
                    </div>

                    {/* Action */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="pt-4"
                    >
                        <Link to="/">
                            <Button className="flex items-center gap-3 px-6 py-2 text-lg mx-auto">
                                <FaHome />
                                Guide Me Home
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Fun extra detail */}
                    <p className="text-white/30 text-sm mt-12 tracking-widest uppercase">
                        Lost in the Blizzard
                    </p>
                </motion.div>
            </div>

            {/* Decorative Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60 pointer-events-none"></div>
        </div>
    );
};

export default NotFoundPage;
