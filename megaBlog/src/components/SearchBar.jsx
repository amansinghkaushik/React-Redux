import React, { useState, useRef, useEffect } from 'react';

function SearchBar({ onSearch }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsExpanded(false);
                setQuery('');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const toggleExpand = () => {
        if (isExpanded && query) {
            // If expanded and has text, clear and collapse
            setQuery('');
            setIsExpanded(false);
        } else {
            // Toggle expansion
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div ref={containerRef} className="relative">
            <form onSubmit={handleSearch}>
                <div
                    className={`
                        flex items-center rounded-full transition-all duration-300 ease-out
                        ${isExpanded 
                            ? 'bg-gray-100 w-64 px-4 py-2' 
                            : 'w-11 h-11 justify-center bg-transparent'
                        }
                    `}
                >
                    {/* Expandable Input - on the left */}
                    <div className={`
                        overflow-hidden transition-all duration-300 ease-out flex-1
                        ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}
                    `}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Search..."
                            className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none"
                        />
                    </div>

                    {/* Search/Cross Icon - on the right */}
                    <button
                        type="button"
                        onClick={toggleExpand}
                        className={`
                            flex items-center justify-center flex-shrink-0 transition-all duration-200
                            ${isExpanded ? 'ml-2' : ''}
                        `}
                    >
                        {isExpanded ? (
                            // Cross icon
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none"
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        ) : (
                            // Search icon
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 20 20" 
                                fill="none"
                                className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;

