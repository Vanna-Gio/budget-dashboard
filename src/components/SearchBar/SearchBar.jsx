import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import './SearchBar.css';

function SearchBar({ onSearch, placeholder = "Search projects..."}) {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce: wait 300ms after user stops typing before searching
    useEffect (() => {
        const debounceTimer = setTimeout(() => {
            onSearch(searchTerm);

        }, 300);

        // Cleanup: Cancel previous timer when user types again
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, onSearch]);

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button 
                    className="clear-button"
                    onClick={handleClear}
                    aria-label="Clear search"
                    >
                        ×
                    </button>
            )}
        </div>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};
export default SearchBar;