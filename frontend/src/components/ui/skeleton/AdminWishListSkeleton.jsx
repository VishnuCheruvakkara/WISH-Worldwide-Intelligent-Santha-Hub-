import React from 'react';

const AdminWishListSkeleton = () => {
    return (
        <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map(i => (
                <div
                    key={i}
                    className="h-24 rounded-xl bg-white/5 border border-white/10 animate-pulse flex items-center p-6 gap-6"
                >
                    <div className="w-6 h-6 rounded bg-white/10" />
                    <div className="flex-grow flex flex-col gap-2">
                        <div className="w-1/4 h-3 bg-white/10 rounded-full" />
                        <div className="w-3/4 h-3 bg-white/5 rounded-full" />
                    </div>
                    <div className="w-24 h-8 bg-white/5 rounded-full" />
                </div>
            ))}
        </div>
    );
};

export default AdminWishListSkeleton;
