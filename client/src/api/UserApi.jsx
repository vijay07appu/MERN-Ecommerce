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

    const addCart=(product)=>{
        if(!isLogged) return alert("Please log in first")

        const check=cart.every(item=>item.id!==product._id);

        if(check){
            setCart([...cart,{...product,quantity:1}]);
        }
        else{
            alert("This product has already been added to the cart .");
        }
    }
    return {
            isLogged:[isLogged,setIsLogged],
            isAdmin:[isAdmin,setIsAdmin],
            cart:[cart,setCart],
            addCart:addCart
    } 
      
            
     
        
    
}

export default UserApi
