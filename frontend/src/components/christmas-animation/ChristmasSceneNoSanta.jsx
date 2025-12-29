import React from 'react';
import { motion } from 'framer-motion';
import { LiaSnowflakeSolid } from "react-icons/lia";
import ChristmasSleighSVG from './ChristmasSleighSVG';

const ChristmasSceneNoSanta = ({ className }) => {
    // Generate snowflakes for overlay animation
    const snowflakes = Array.from({ length: 70 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 10}s`, // Slower fall
        animationDelay: `${-Math.random() * 20}s`,
        size: Math.random() * 15 + 5, // Slightly larger for icons
        opacity: Math.random() * 0.5 + 0.3
    }));

    return (
        <div className={`fixed top-0 left-0 w-full h-screen overflow-hidden border-t border-white/5 -z-10 ${className || ''}`}>
            {/* The SVG Scene without Santa */}
            <div className="absolute inset-0 w-full h-full">
                <div className="relative w-full h-full bg-gradient-to-b from-[#020510] via-[#0B1026] to-[#1B2447]">
                    {/* Sky with Glowing Dot Stars */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <filter id="strongGlow" x="-200%" y="-200%" width="500%" height="500%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Random Stars placements - Dots with Glow */}
                        {[...Array(150)].map((_, i) => {
                            const r = Math.random() * 1.5 + 0.5;
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

                    {/* Bottom - Trees (Tiled to avoid stretching) */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-[30%] z-30"
                        style={{
                            backgroundImage: `url('/images/elements/tree.png')`,
                            backgroundRepeat: 'repeat-x',
                            backgroundSize: 'contain',
                            backgroundPosition: 'bottom center'
                        }}
                    />

                    {/* Vignette / Atmosphere */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-santa-navy-dark/80 pointer-events-none z-40"></div>
                </div>
            </div>

            {/* Overlay Snowfall Logic - Improved */}
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute text-white animate-fall pointer-events-none"
                    style={{
                        left: flake.left,
                        top: -50,
                        fontSize: `${flake.size}px`,
                        opacity: flake.opacity,
                        animation: `fall ${flake.animationDuration} linear infinite`,
                        animationDelay: flake.animationDelay,
                        filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))'
                    }}
                >
                    <LiaSnowflakeSolid />
                </div>

            ))}

            <style>{`
                @keyframes fall {
                    0% { transform: translateY(-50px) translateX(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(650px) translateX(${Math.random() * 20 - 10}px) rotate(360deg); opacity: 0; }
                }
             `}</style>


        </div>
    );
};

export default ChristmasSceneNoSanta;
