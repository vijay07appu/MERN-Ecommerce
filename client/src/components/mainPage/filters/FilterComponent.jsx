import React, { useState } from 'react';
import dotenv from 'dotenv'


function FilterComponent({ setFilters }) {
    const [price, setPrice] = useState({ min: '', max: '' });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setPrice({ ...price, [name]: value });
    };

   
    const applyFilters = () => {
        // Convert price object to JSON string
        setFilters(prev => ({ ...prev, price: JSON.stringify(price) }));
    };

    return (
        <div className="filter_component">
            <label htmlFor="min_price">Min Price:</label>
            <input
                type="number"
                id="min_price"
                name="min"
                value={price.min}
                onChange={handleFilterChange}
            />
            <label htmlFor="max_price">Max Price:</label>
            <input
                type="number"
                id="max_price"
                name="max"
                value={price.max}
                onChange={handleFilterChange}
            />
            <button onClick={applyFilters}>Apply Filters</button>
        </div>
    );
}

export default FilterComponent;