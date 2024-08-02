import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserApi(token) {

    const [isLogged,setIsLogged]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        if(token){
            const getUser=async()=>{
                try{
                    const res=await axios.get('http://localhost:5000/api/user/info',{
                        headers:{Authorization:token}
                    });

                    console.log("res is "+res)
                    console.log("setIsLogged is true")
                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                }
                catch(err){
                    alert(err.response.data.msg)
                }
            }
            getUser();
        }

    },[token]);

    const addCart = (product) => {
        if (!isLogged) return alert("Please log in first");
    
        setCart(prevCart => {
            // Check if the item already exists in the cart
            const existingItemIndex = prevCart.findIndex(item => item.product._id === product._id);
    
            if (existingItemIndex > -1) {
                // Item exists, increase quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + 1
                };
                return updatedCart;
            } else {
                // Item does not exist, add new item with quantity 1
                return [...prevCart, { product, quantity: 1 }];
            }
        });
    };
    return {
            isLogged:[isLogged,setIsLogged],
            isAdmin:[isAdmin,setIsAdmin],
            cart:[cart,setCart],
            addCart:addCart
    } 
      
            
     
        
    
}

export default UserApi
