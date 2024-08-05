import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'


function ProductApi() {

    const [products,setProducts]=useState([])

    const getProducts=async()=>{
        const res=await axios.get(`http://localhost:5000/api/products`);
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
