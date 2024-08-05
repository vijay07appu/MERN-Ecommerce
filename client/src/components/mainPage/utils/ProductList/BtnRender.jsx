

import React, { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv'


function BtnRender({ product, isAdmin }) {
    const state = useContext(GlobalState);
    const { addToCart } = state.cartApi;
    const [email] = state.userApi.email;

    const handleAddToCart = () => {
        if (email) {
            addToCart(email, product._id, 1);
        } else {
            alert("Please Login")
            console.error('User email is not available');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
            alert(response.data);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    return (
        <div className='row_btn'>
            {isAdmin ? (
                <>
                    <button id='btn_buy' onClick={() => handleDelete(product._id)}>
                        Delete
                    </button>
                    <Link id='btn_view' to={`update-product/${product._id}`}>
                        Edit
                    </Link>
                </>
            ) : (
                <>
                    <button id='btn_buy' onClick={handleAddToCart}>Cart</button>
                    <Link id='btn_view' to={`detail/${product._id}`}>
                        View
                    </Link>
                </>
            )}
        </div>
    );
}

export default BtnRender;

