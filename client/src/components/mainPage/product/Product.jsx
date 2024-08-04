// import React, { useContext } from 'react'
// import { GlobalState } from '../../../GlobalState'
// import ProductList from '../utils/ProductList/ProductList';
// import  './Product.css'
// function Product() {
//     const state=useContext(GlobalState);
    
//     const [products]=state.productApi.products
//     const [isAdmin]=state.userApi.isAdmin
    
//     return (
//         <>
//         <div className='products'>
//             {
//                 products.map(product=>{
                    

//                    return  <ProductList key={product._id} product={product} isAdmin={isAdmin}/>
                    
    
//                 })
//             }
//         </div>
//         </>
        
//     )
// }

// export default Product

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import ProductList from '../utils/ProductList/ProductList';
// import CategoryFilter from '../filters/CategoryFilter'; // Import CategoryFilter
// import FilterComponent from '../filters/FilterComponent';
import SortComponent from '../filters/SortComponent';
import PaginationComponent from '../filters/PaginationComponent';
import './Product.css';

function Product() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productApi.products;
    const [isAdmin] = state.userApi.isAdmin;
    // const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [token] = state.token;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const query = new URLSearchParams({
                    sort,
                    page,
                }).toString();

                const response = await axios.get(`http://localhost:5000/api/products?${query}`, {
                    headers: { Authorization: token },
                });
                // console.log("response from fetching ")
                // console.log(response.data)

                setProducts(response.data.product);
                setTotalPages(Math.ceil(response.data.result / 9)); // Assuming 9 products per page
            } catch (error) {
                console.log("Error in fetching products:", error);
                alert(error.response?.data?.msg || "Something went wrong");
            }
        };

        fetchProducts();
    }, [sort, page, token, setProducts]);

    return (
        <>
            <div className="filter_sort">
                <SortComponent setSort={setSort} />
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

