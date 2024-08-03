import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'


function Cart() {
    const state = useContext(GlobalState);
    const [cart, setCart] = state.cartApi.cart;
    const { removeFromCart } = state.cartApi;
    const [email]=state.userApi.email

    const handleRemove = (productId) => {
      removeFromCart(email,productId);
    }


    if (cart.length === 0) {
        return <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Cart is Empty</h2>;
    }

    return (
        <div>
            {cart.map(item => (
                <div className='detail' key={item.product._id}>
                    <img src={item.product.images} alt='' />
                    <div className='box-detail'>
                        <div className='row'>
                            <h2>{item.product.title}</h2>
                            <h6>{item.product.product_id}</h6>
                        </div>
                        <span>${item.product.price}</span>
                        <p>{item.product.description}</p>
                        <p>{item.product.content}</p>
                        <p>Sold: {item.product.sold}</p>
                        <p>Quantity: {item.quantity}</p>
                        <Link to='/cart' className='cart'>Buy Now</Link>
                        <p><button className='cart' onClick={() => handleRemove(item.product._id)}>Remove</button></p>
                    </div>
                </div>
            ))}
        </div>
    )
}



export default Cart
