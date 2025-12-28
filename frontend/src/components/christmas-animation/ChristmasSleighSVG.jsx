import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ChristmasSleighSVG = ({ className }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Animate horizontal movement (traveling right) instead of scaling
    const x = useTransform(scrollYProgress, [0, 1], [-200, 200]); // Move from left to right across the moon area
    const smoothX = useSpring(x, { stiffness: 50, damping: 20 });

    // Slight Y movement to follow scroll naturally
    const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const smoothY = useSpring(y, { stiffness: 60, damping: 20 });

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#020510] via-[#0B1026] to-[#1B2447] ${className}`}>

            {/* Sky with Glowing Dot Stars */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <filter id="strongGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                            <feMergeNode in="SourceGraphic" /> {/* Double source for core brightness */}
                        </feMerge>
                    </filter>
                </defs>

                {/* Random Stars placements - Dots with Glow */}
                {[...Array(150)].map((_, i) => {
                    const r = Math.random() * 1.5 + 0.5; // Small dots (radius 0.5 to 2)
                    const opacity = Math.random() * 0.7 + 0.3;
                    return (
                        <circle
                            key={i}
                            cx={`${Math.random() * 100}%`}
                            cy={`${Math.random() * 100}%`}
                            r={r}
                            fill="white"
                            opacity={opacity}
                            filter="url(#strongGlow)"
                        />
                    );
                })}

                {/* A few brighter "Hero" stars */}
                {[...Array(10)].map((_, i) => (
                    <circle
                        key={`hero-${i}`}
                        cx={`${Math.random() * 100}%`}
                        cy={`${Math.random() * 60}%`}
                        r={2.5}
                        fill="white"
                        filter="url(#strongGlow)"
                        opacity="0.9"
                    />
                ))}
            </svg>

            {/* Center - Large Moon - Moved Up */}
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] md:w-[550px] h-[280px] sm:h-[350px] md:h-[550px] z-10 flex items-center justify-center">
                <img
                    src="/images/backgrounds/moon.png"
                    alt="Full Moon"
                    className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(255,255,230,0.4)]"
                />
            </div>

            <motion.div
                style={{ x: smoothX, y: smoothY }}
                className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[240px] sm:w-[320px] md:w-[400px] pointer-events-none"
            >
                <img
                    src="/images/characters/santa.png"
                    alt="Santa Sleigh"
                    className="w-full h-auto object-contain animate-float"
                />
            </motion.div>

            {/* Bottom - Trees (Tiled to avoid stretching) */}
            <div
                className="absolute bottom-0 left-0 w-full h-[30%] z-30"
                style={{
                    backgroundImage: `url('/images/elements/tree.png')`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'contain', // contain ensures trees show fully without cutoff, or cover if we want no gaps. 'contain' + repeat-x works for a strip.
                    backgroundPosition: 'bottom center'
                }}
            />

            {/* Vignette / Atmosphere */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-santa-navy-dark/80 pointer-events-none z-40"></div>

        </div>
    );
};

export default ChristmasSleighSVG;
