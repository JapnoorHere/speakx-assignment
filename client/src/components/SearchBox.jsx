import { useState, useEffect } from 'react';

const SearchBox = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                onSearch(query);
            } else {
                onSearch('');
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [query, onSearch]);

    return (
        <div className="flex items-center space-x-2 w-full max-w-lg mx-auto bg-white rounded-xl shadow-md border focus-within:ring-2 focus-within:ring-black transition-all duration-300">
            <input
                type="text"
                placeholder="🔍 Search questions..."
                className="flex-1 bg-transparent outline-none px-6 py-3 text-gray-700 placeholder-gray-400 text-lg focus:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <button
                    onClick={() => setQuery('')}
                    className="text-gray-500 hover:text-gray-700 pr-4"
                    aria-label="Clear search"
                >
                    ✖
                </button>
            )}
        </div>
    );
};

export default SearchBox;
