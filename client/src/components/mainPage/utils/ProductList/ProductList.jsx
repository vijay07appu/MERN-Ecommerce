import React from 'react'

import BtnRender from './BtnRender'

function ProductList({ product, isAdmin }) {
    


    return (
        <div className="product_card">
            {
                isAdmin && <input type='checkbox' defaultChecked={product.checked} />
            }
            <img src={product.images} alt="this is space of image" />
            <div className='product_box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>

            </div>

            <BtnRender product={product}/>

           
        </div>

    )
}

export default ProductList
