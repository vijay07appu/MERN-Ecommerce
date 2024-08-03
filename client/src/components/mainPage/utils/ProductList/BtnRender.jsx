import React from 'react'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'


function BtnRender({ product }) {

    const state = useContext(GlobalState)
    const [isAdmin] = state.userApi.isAdmin;
    const { addToCart } =state.cartApi;
    const [email]=state.userApi.email
    


    const handleAddToCart = () => {

        console.log("handleaddtocart from btnRender executed")
        if (email) {
            console.log("send to addToCart of cartApi")
            addToCart(email, product._id, 1); 
        } else {
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
            {
                isAdmin ?
                    <>
                        <button className='btn_view' onClick={()=>handleDelete(product._id)}>
                            Delete
                        </button>
                        <Link id='btn_view' to={`update-product/${product._id}`}>
                            Edit
                        </Link>
                    </>
                    :
                    <>
                        
                        <button onClick={handleAddToCart}>Add to Cart</button>
                        <Link id='btn_view' to={`detail/${product._id}`}>
                            View
                        </Link>
                    </>
            }
        </div>

    )
}

export default BtnRender
