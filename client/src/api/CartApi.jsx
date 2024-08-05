import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';



function CartApi(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getCart = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/user/cart`, {
                        headers: { Authorization: token }
                    });

                    console.log("res from cartapi is ")
                    console.log(res)
                    console.log("res data is ")
                    console.log(res.data)

                    setCart(res.data || []);
                    console.log("cart is ")
                    console.log(cart)
                    setIsLogged(true);
                } catch (err) {
                    alert(err.response.data.msg);
                }
            };
            getCart();
        }
    }, [token]);

    const addToCart = async (email, productId, quantity) => {
        if (!isLogged) return; // Prevent adding to cart if not logged in

        try {

            // const productResponse = await axios.get(`http://localhost:5000/api/product/${productId}`);
            // if (!productResponse.data) return; // Ensure product exists

            await axios.post(`http://localhost:5000/api/user/add-to-cart`, { email, productId, quantity }, { headers: { Authorization: token } });
            const response = await axios.get(`http://localhost:5000/api/user/cart`, { headers: { Authorization: token } });
            setCart(response.data || []);
        } catch (error) {
            console.error('Failed to add item to cart', error);
        }
    };

    const removeFromCart = async (email, productId, quantity) => {
        if (!isLogged) return; // Prevent removing from cart if not logged in

        try {
            await axios.post(`http://localhost:5000/api/user/remove-from-cart`, { email, productId, quantity }, { headers: { Authorization: token } });
            const response = await axios.get(`http://localhost:5000/api/user/cart`, { headers: { Authorization: token } });
            setCart(response.data || []);
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addToCart,
        removeFromCart
    };
}

export default CartApi;


