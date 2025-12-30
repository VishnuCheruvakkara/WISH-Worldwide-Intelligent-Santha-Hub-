import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Pagination({ page, totalPages, onPageChange }) {
    const buttons = [];

    // Generate numbered buttons
    for (let i = 1; i <= totalPages; i++) {
        buttons.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`w-10 h-10 mx-1 rounded-lg border shadow-md shadow-black/50 border-gray-800 flex items-center justify-center 
          ${page === i ? "bg-brand-3 text-white" : "text-white bg-gray-800"}
          hover:bg-brand-3 transition cursor-pointer`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="flex justify-center items-center mt-6 gap-2">

            {/* Prev Button */}
            <button
                onClick={() => page > 1 && onPageChange(page - 1)}
                disabled={page === 1}
                className={`w-10 h-10 rounded-lg border shadow-md shadow-black/50 border-gray-800 flex items-center justify-center
          ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-brand-3 cursor-pointer"}
          bg-gray-800 text-white transition`}
            >
                <MdChevronLeft size={20} />
            </button>

            {/* Page Buttons */}
            {buttons}

            {/* Next Button */}
            <button
                onClick={() => page < totalPages && onPageChange(page + 1)}
                disabled={page === totalPages}
                className={`w-10 h-10 rounded-lg border shadow-md shadow-black/50 border-gray-800 flex items-center justify-center
          ${page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-brand-3 cursor-pointer"}
          bg-gray-800 text-white transition `}
            >
                <MdChevronRight size={20} />
            </button>
        </div>
    );
}
