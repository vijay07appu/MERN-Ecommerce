import { createContext, useEffect, useState } from "react";
import ProductApi from "./api/ProductApi";
import UserApi from "./api/UserApi";
import CartApi from "./api/CartApi";
import axios from "axios";
axios.defaults.withCredentials = true;

export const GlobalState=createContext();

export const DataProvider=({children})=>{

    const [token,setToken]=useState(false);

    const refreshToken = async () => {
    
          const res = await axios.get('https://mern-ecommerce-2-k26v.onrender.com/api/user/refresh_token');
          setToken(res.data.accesstoken);
          
      };

    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        if(firstLogin)  refreshToken();
    },[])


   

    const state={
        token:[token,setToken],
        productApi:ProductApi(),
        userApi:UserApi(token),
        cartApi:CartApi(token)
    }

    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )

}