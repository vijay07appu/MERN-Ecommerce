
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';
import SortComponent from '../filters/SortComponent';
import PaginationComponent from '../filters/PaginationComponent';
import './Product.css';

function Product() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productApi.products;
    const [isAdmin] = state.userApi.isAdmin;
   
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [token] = state.token;
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([])


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://mern-ecommerce-2-k26v.onrender.com/api/categories', {
                    headers: {
                         Authorization: token, 
                         'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json',
                        },withCredentials: true,
                });
                // console.log("response of categories ")
                // console.log(response)
                setCategories(response.data.categories);
                // console.log("category worked fine ")
            } catch (error) {
                console.log("Error fetching categories:", error);
                alert(error.response?.data?.msg || "Something went wrong while fetching categories");
            }
        };

        fetchCategories();
    }, [token]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = new URLSearchParams({
                    sort,
                    page,
                    category: category || '',
                    limit:100
                }).toString();

                const response = await axios.get(`https://mern-ecommerce-2-k26v.onrender.com/api/products?${query}`, {
                    headers: {
                        Authorization: token || '',
                        'Cache-Control': 'no-cache',
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                // console.log("response from fetching all categories ")
                // console.log(response.data)

                setProducts(response.data.product);
                setTotalPages(Math.ceil(response.data.result / 100)); // Assuming 9 products per page

                // console.log("product fetched fine")
            } catch (error) {
                console.log("Error in fetching products:", error);
                alert(error.response?.data?.msg || "Something went wrong");
            }
        };

        fetchProducts();
    }, [sort,page, category, token]);

    return (
        <>
            <div className="filter_sort">
                <SortComponent setSort={setSort} />
                <div className="filter_category">
                    <label htmlFor="category">Category:</label>
                    <select id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='products'>
                {products.map(product => (
                    <ProductList key={product._id} product={product} isAdmin={isAdmin} />
                ))}
            </div>
            <PaginationComponent page={page} setPage={setPage} totalPages={totalPages} />
        </>
    );
}

export default Product;

