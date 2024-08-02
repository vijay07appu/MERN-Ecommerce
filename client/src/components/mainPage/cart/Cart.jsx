import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'

function Cart() {

    const state = useContext(GlobalState)

    const [cart,setCart] = state.userApi.cart

    
    const removeProduct = (id) => {
        const updatedCart = cart.map(item => {
            if (item.product._id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return null; // Mark for removal
            }
            return item;
        }).filter(item => item !== null); // Remove null items

        setCart(updatedCart);
    }; 

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
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
                        <p><button className='cart' onClick={() => removeProduct(item.product._id)}>Remove</button></p>
                    </div>
                </div>
            ))}
        </div>
    )
}



export default Cart
