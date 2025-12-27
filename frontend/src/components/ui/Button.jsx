import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-santa-red text-white shadow-[0_4px_14px_0_rgba(255,56,56,0.5)] hover:bg-santa-red-dark",
        secondary: "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20",
        outline: "border-2 border-santa-red text-santa-red hover:bg-santa-red hover:text-white"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
