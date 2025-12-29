import React from 'react';
import { FaSearchMinus } from 'react-icons/fa';

const NoResultsFound = ({ message = "No records found matching your criteria." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white/5 rounded-2xl border border-white/10 border-dashed animate-in fade-in zoom-in duration-500">
            <div className="bg-white/5 p-6 rounded-full mb-6">
                <FaSearchMinus className="text-4xl text-white/30" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nothing to see here</h3>
            <p className="text-white/50 max-w-md mx-auto">
                {message}
            </p>
        </div>
    );
};

export default NoResultsFound;
