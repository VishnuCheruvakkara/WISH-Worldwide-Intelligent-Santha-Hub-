import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';

const SANTA_QUOTES = [
    "Believe in the magic of the season",
    "Kindness is the greatest gift you can give",
    "The North Pole is buzzing with your wishes",
    "The world is full of magical things",
    "Spreading joy, one wish at a time",
    "The stars are aligning for your dreams",
    "Generosity is the spirit of life",
    "Every wish is a seed of hope",
    "Your heart's desire is being heard",
    "The world becomes brighter with kindness"
];

const Spinner = () => {
    const randomQuote = useMemo(() => {
        return SANTA_QUOTES[Math.floor(Math.random() * SANTA_QUOTES.length)];
    }, []);

    // Generate 25 slow snowflakes that start at different y-positions
    const snowParticles = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            startY: `${Math.random() * 100}vh`, // Start at various positions so it's immediate
            duration: 8 + Math.random() * 10,
            size: 8 + Math.random() * 12
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050E3C] overflow-hidden">
            {/* Immediate Graceful Snowfall */}
            <div className="absolute inset-0 pointer-events-none">
                {snowParticles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ y: particle.startY, opacity: 0 }}
                        animate={{
                            y: ['0vh', '110vh'],
                            opacity: [0, 0.5, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            // Start the animation from a progress point based on the startY
                            delay: -(particle.duration * (parseFloat(particle.startY) / 100))
                        }}
                        className="absolute text-white"
                        style={{ left: particle.left }}
                    >
                        <FaSnowflake size={particle.size} />
                    </motion.div>
                ))}
            </div>

            <div className="relative mb-8">
                {/* Small Brighter Multi-Color Snowflake */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                        color: ["#FFFFFF", "#FF3838", "#FFFFFF"],
                        filter: [
                            "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
                            "drop-shadow(0 0 15px rgba(255,56,56,0.8))",
                            "drop-shadow(0 0 10px rgba(255,255,255,0.8))"
                        ]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <FaSnowflake size={48} />
                </motion.div>
            </div>

            {/* Compact Quote Display */}
            <div className="text-center px-6 max-w-sm relative z-10 flex flex-col items-center">
                <motion.h3
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-medium text-base tracking-wide mb-2 leading-relaxed"
                >
                    "{randomQuote}"
                </motion.h3>

                {/* Small Red Signature */}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-santa-red font-bold uppercase tracking-[0.2em] text-[10px]"
                >
                    Santa Clause
                </motion.span>
            </div>

            {/* Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default Spinner;
