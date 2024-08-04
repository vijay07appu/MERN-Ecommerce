import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

function Cart() {
    const state = useContext(GlobalState);
    const [cart] = state.cartApi.cart;
    const { removeFromCart } = state.cartApi;
    const [email] = state.userApi.email;

    const handleRemove = (productId) => {
        removeFromCart(email, productId);
    };

    console.log("cart length is "+cart.length)

    if (cart.length === 0) {
        return <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Cart is Empty</h2>;
    }

    return (
        <div>
            {cart.map(item => {
                const product = item.product;

                // Check if product exists and has images property
                if (!product) {
                    return (
                        <div key={item._id} className='detail'>
                            <h3>Product information is missing</h3>
                        </div>
                    );
                }

                 // Ensure images is always an array

                return (
                    <div className='detail' key={item._id}>
                        <img src={product.images} alt={product.title || 'Product'} /> {/* Fallback image */}
                        <div className='box-detail'>
                            <div className='row'>
                                <h2>{product.title || 'No Title'}</h2>
                                <h6>{product.product_id || 'No ID'}</h6>
                            </div>
                            <span>${product.price || '0.00'}</span>
                            <p>{product.description || 'No Description'}</p>
                            <p>{product.content || 'No Content'}</p>
                            <p>Sold: {product.sold || '0'}</p>
                            <p>Quantity: {item.quantity}</p>
                            <Link to='/cart' className='cart'>Buy Now</Link>
                            <p>
                                <button className='cart' onClick={() => handleRemove(product._id)}>Remove</button>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Cart;
