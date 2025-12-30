import React from 'react';

const NoResultsFound = ({ message = "No records found matching your criteria." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white/5 rounded-2xl border border-white/10 border-dashed animate-in fade-in zoom-in duration-500">
            <div className="mb-6">
                <img 
                    src="/images/notfound/santa_not_found.svg" 
                    alt="Not Found" 
                    className="w-32 h-32 opacity-60"
                />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nothing to see here</h3>
            <p className="text-white/50 max-w-md mx-auto">
                {message}
            </p>
        </div>
    );
};

export default NoResultsFound;
