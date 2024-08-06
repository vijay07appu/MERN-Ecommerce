import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cart() {
    const state = useContext(GlobalState);
    const [cart] = state.cartApi.cart;
    const { removeFromCart } = state.cartApi;
    const [email] = state.userApi.email;

    const handleRemove = (productId) => {
        removeFromCart(email, productId);
    };

    const handlePayment = async () => {
        try {
            // Make a request to your server to create an order
            const { data } = await axios.post('http://localhost:5000/api/payment/create-order', {
                amount: calculateTotalAmount(), // Replace with actual total amount calculation
            });

            const options = {
                key: 'rzp_test_gFmZy0XkxZ46RI', // Replace with your Razorpay key
                amount: data.amount, // Amount in paise
                currency: 'INR',
                name: 'Shopii',
                description: 'Test Transaction',
                order_id: data.orderId,
                handler: function (response) {
                    // Handle successful payment here
                    console.log(response);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999'
                },
                notes: {
                    address: 'Test Address'
                },
                theme: {
                    color: '#F37254'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error while initiating payment:", error);
        }
    };

    const calculateTotalAmount = () => {
        // Replace with your actual calculation logic
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 100; // Convert to paise
    };

    if (cart.length === 0) {
        return <h2 style={{ textAlign: "center", fontSize: "2rem" }}>Cart is Empty</h2>;
    }

    return (
        <div>
            {cart.map(item => {
                const product = item.product;

                if (!product) {
                    return (
                        <div key={item._id} className='detail'>
                            <h3>Product information is missing</h3>
                        </div>
                    );
                }

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
                            <button className='cart' onClick={handlePayment}>Buy Now</button>
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
