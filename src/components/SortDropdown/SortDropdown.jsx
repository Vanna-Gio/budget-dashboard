import PropTypes from "prop-types";
import './SortDropdown.css';

function SortDropdown({ onSort, currentSort }) {
    const sortOptions = [
        {value: 'default', label: 'Default Order'},
        {value: 'amount-high', label: 'Amount: High to Low'},
        {value: 'amount-low', label: 'Amount: Low to High'},
        { value: 'title-asc', label: 'Title: A to Z' },
        { value: 'title-desc', label: 'Title: Z to A' }
    ];

    return (
        <div className="sort-dropdown">
            <label htmlFor="sort-select" className="sort-label">
                Sort by:
            </label>
            <select 
                id="sort-select"
                className="sort-select"
                value={currentSort}
                onChange={(e) => onSort(e.target.value)}
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
        </div>
    )
}

SortDropdown.protoTypes = {
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.string.isRequired
};

export default  SortDropdown;