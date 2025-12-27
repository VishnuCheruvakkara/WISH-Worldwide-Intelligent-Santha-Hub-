import React from 'react';
import { motion } from 'framer-motion';
import { LiaSnowflakeSolid } from "react-icons/lia";
import ChristmasSleighSVG from './ChristmasSleighSVG';

const ChristmasScene = ({ className }) => {
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
        <div className={`relative w-full bg-santa-navy-dark overflow-hidden border-t border-white/5 ${className || 'h-[700px]'}`}>
            {/* The SVG Scene */}
            <div className="absolute inset-0 w-full h-full">
                <ChristmasSleighSVG className="w-full h-full object-cover" />
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

export default ChristmasScene;
