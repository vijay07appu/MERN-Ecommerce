import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ProductApi() {

    const [products,setProducts]=useState([])

    const getProducts=async()=>{
        const res=await axios.get('https://mern-ecommerce-1-fgb6.onrender.com/api/products');
        setProducts(res.data.product);
       
    }

    useEffect(()=>{
        getProducts();
    },[])
    return {
        products:[products,setProducts]
        
    }
}

export default ProductApi
