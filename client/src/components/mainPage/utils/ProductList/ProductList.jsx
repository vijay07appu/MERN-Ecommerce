
import React from 'react';
import BtnRender from './BtnRender';
import dotenv from 'dotenv'


function ProductList({ product, isAdmin }) {
    return (
        <div className="product_card">
            {isAdmin && <input type='checkbox' defaultChecked={product.checked} />}
            <img src={product.images} alt="Product" />
            <div className='product_box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <BtnRender product={product} isAdmin={isAdmin} />
        </div>
    );
}

export default ProductList;

