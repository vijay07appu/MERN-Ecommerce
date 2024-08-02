import React from 'react'
import Product from './product/Product'
import Cart from './cart/Cart'
import Login from './login/Login'
import Register from './login/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailProduct from './utils/DetailProduct/DetailProduct'

function MainPage() {
    return (
     
            <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/detail/:id" element={<DetailProduct/>}/>
                
            </Routes>

        


    )
}

export default MainPage
