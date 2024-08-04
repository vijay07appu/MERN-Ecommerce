import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import './CategoryFilter.css';

function CategoryFilter({ setFilters }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://mern-ecommerce-2-k26v.onrender.com/api/category');
                console.log("response.data.categories are ")
                console.log(response.data.categories)
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        setFilters(prevFilters => ({ ...prevFilters, category: e.target.value }));
    };

    return (
        <div className="category_filter">
            <h3>Filter by Category</h3>
            <select onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map(category => (
                    
                    <option key={category._id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategoryFilter;
