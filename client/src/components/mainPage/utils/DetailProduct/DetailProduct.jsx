import React, { useContext, useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';
import './DetailProduct.css'
import dotenv from 'dotenv'


function DetailProduct() {

    const params=useParams()
    const state=useContext(GlobalState)
    const [products]=state.productApi.products
    
    const [detailProduct,setDetailProduct]=useState([])

    useEffect(()=>{
        if(params)
        {
            products.forEach(product=>{
               
                if(product._id===params.id) 
                    {
                       
                        setDetailProduct(product)
                    }

            })
        }
    },[params,products])
   
    if(detailProduct.length === 0) 
    {
        
        return null;
    }
    
    return (
        <div className='detail'>
            <img src={detailProduct.images} alt="image not found" />
            <div className='box-detail'>
                <div className='row'>
                    <h2>{detailProduct.title}</h2>
                    <h6>{detailProduct.product_id}</h6>
                </div>
                <span >₹{detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.content}</p>
                <p>Sold:{detailProduct.sold}</p>
                <Link to="/cart" className="cart">Buy Now </Link>

            </div>

        </div>
        
    )
}

export default DetailProduct
