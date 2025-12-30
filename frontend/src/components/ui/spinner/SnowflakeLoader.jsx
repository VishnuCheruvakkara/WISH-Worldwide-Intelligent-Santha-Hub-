import React from 'react';
import { FaSnowflake } from 'react-icons/fa';

const SnowflakeLoader = ({ message = "Polishing sleigh bells..." }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <FaSnowflake className="text-4xl text-santa-red animate-spin text-white/20" />
            <p className="text-white/40 italic text-sm">{message}</p>
        </div>
    );
};

export default SnowflakeLoader;
