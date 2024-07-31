import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserApi(token) {

    const [isLogged,setIsLogged]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)

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

    },[token])
    return {
            isLogged:[isLogged,setIsLogged],
            isAdmin:[isAdmin,setIsAdmin]
    } 
      
            
     
        
    
}

export default UserApi
