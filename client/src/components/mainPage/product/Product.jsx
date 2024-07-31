import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList/ProductList';
import  './Product.css'
function Product() {
    const state=useContext(GlobalState);
    
    const [products]=state.productApi.products
    console.log(" p is "+products)
    return (
        <>
        <div className='products'>
            {
                products.map(product=>{
                    

                   return  <ProductList key={product._id} product={product}/>
                    
    
                })
            }
        </div>
        </>
        
    )
}

export default Product
