import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';

const CommonSpinner = () => {
    // Generate 25 slow snowflakes that start at different y-positions (Same as main Spinner)
    const snowParticles = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            startY: `${Math.random() * 100}vh`,
            duration: 8 + Math.random() * 10,
            size: 8 + Math.random() * 12
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050E3C]/60 backdrop-blur-md overflow-hidden pointer-events-auto">
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
                {/* Small Brighter Multi-Color Snowflake (Same as main Spinner) */}
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

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                className="text-white font-medium text-xs uppercase tracking-[0.3em]"
            >
                Processing Magic
            </motion.p>

            {/* Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
};

export default CommonSpinner;
