import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (!totalPages || totalPages <= 1) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className="flex items-center justify-center gap-6 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isFirstPage}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                aria-label="Previous page"
            >
                <FaChevronLeft />
            </button>

            <span className="text-white/70 font-medium">
                Page <span className="text-white font-bold">{currentPage || 1}</span> of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isLastPage}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                aria-label="Next page"
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
