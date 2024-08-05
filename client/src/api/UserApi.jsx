import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dotenv from 'dotenv'


function UserApi(token) {

    const [isLogged,setIsLogged]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)
    const [email,setEmail]=useState();

    useEffect(()=>{
        if(token){
            const getUser=async()=>{
                try{
                    const res=await axios.get(`http://localhost:5000/api/user/info`,{
                        headers:{Authorization:token}
                    });

                    setEmail(res.data.email)

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


    return {
            isLogged:[isLogged,setIsLogged],
            isAdmin:[isAdmin,setIsAdmin],
            email:[email,setEmail]
            
    } 
      
            
     
        
    
}

export default UserApi
