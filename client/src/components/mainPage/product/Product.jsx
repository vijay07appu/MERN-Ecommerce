import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList/ProductList';
import  './Product.css'
function Product() {
    const state=useContext(GlobalState);
    
    const [products]=state.productApi.products
    const [isAdmin]=state.userApi.isAdmin
    
    return (
        <>
        <div className='products'>
            {
                products.map(product=>{
                    

                   return  <ProductList key={product._id} product={product} isAdmin={isAdmin}/>
                    
    
                })
            }
        </div>
        </>
        
    )
}

export default Product
