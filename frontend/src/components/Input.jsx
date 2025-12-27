import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, icon: Icon, className = '' }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-sm font-medium text-gray-200 ml-1">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF3838] transition-colors">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full bg-[#002455]/50 border border-white/10 rounded-xl py-3 px-4 ${Icon ? 'pl-11' : ''} 
            text-white placeholder-gray-400 focus:outline-none focus:border-[#FF3838] focus:ring-1 focus:ring-[#FF3838] 
            transition-all duration-300 backdrop-blur-sm`}
                />
            </div>
        </div>
    );
};

export default Input;
