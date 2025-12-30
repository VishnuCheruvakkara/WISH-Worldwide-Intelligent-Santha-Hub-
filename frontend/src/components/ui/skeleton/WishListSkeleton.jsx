import React from 'react';

const WishListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
                <div
                    key={i}
                    className="h-48 rounded-2xl bg-white/5 border border-white/10 animate-pulse flex flex-col items-center justify-center p-6 gap-4"
                >
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                    <div className="w-3/4 h-3 bg-white/10 rounded-full" />
                    <div className="w-1/2 h-3 bg-white/10 rounded-full" />
                    <div className="w-20 h-2 bg-white/5 rounded-full mt-4" />
                </div>
            ))}
        </div>
    );
};

export default WishListSkeleton;
