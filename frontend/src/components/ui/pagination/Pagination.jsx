import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Ensure we are working with numbers
    const current = Number(currentPage) || 1;
    const total = Number(totalPages) || 1;

    // Don't render anything if there's only one page
    if (total <= 1) return null;

    const isFirstPage = current <= 1;
    const isLastPage = current >= total;

    return (
        <div className="flex items-center justify-center gap-6 mt-8 mb-4">
            <button
                onClick={() => !isFirstPage && onPageChange(current - 1)}
                disabled={isFirstPage}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                aria-label="Previous page"
            >
                <FaChevronLeft />
            </button>

            <span className="text-white/70 font-medium">
                Page <span className="text-white font-bold">{current}</span> of {total}
            </span>

            <button
                onClick={() => !isLastPage && onPageChange(current + 1)}
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
