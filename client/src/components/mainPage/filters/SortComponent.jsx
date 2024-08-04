import React from 'react';
import './SortComponent.css'
function SortComponent({ setSort }) {
    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    return (
        <div className="sort_component">
                <label htmlFor="sort">Sort By:</label>
                <select id="sort" onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="createdAt">Newest</option>
                    <option value="-createdAt">Oldest</option>
                </select>
            </div>
    );
}

export default SortComponent;

