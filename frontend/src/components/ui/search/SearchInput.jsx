import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import useDebounce from '../../../hooks/useDebounce';

const SearchInput = ({
    onSearch,
    placeholder = "Search wishes...",
    delay = 500,
    icon: Icon = FaSearch,
    className = ""
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, delay);

    // Initial search or external resets could benefit from this, strictly for internal consistency
    useEffect(() => {
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

    const handleClear = () => {
        setSearchTerm("");
        onSearch("");
    };

    return (
        <div className={`relative w-full ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 z-10">
                <Icon />
            </div>

            <input
                type="text"
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-santa-red/50 focus:border-transparent 
                           transition-all backdrop-blur-sm"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors cursor-pointer z-10"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
