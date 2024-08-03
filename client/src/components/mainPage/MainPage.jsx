import React from 'react'
import Product from './product/Product'
import Cart from './cart/Cart'
import Login from './login/Login'
import Register from './login/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailProduct from './utils/DetailProduct/DetailProduct'
import CreateProduct from './product/CreateProduct'
import UpdateProduct from './product/UpdateProduct'

function MainPage() {
    return (
     
            <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/detail/:id" element={<DetailProduct/>}/>
                <Route path="/create-product" element={<CreateProduct/>}/>
                <Route path="/update-product/:id" element={<UpdateProduct/>}/>
                
            </Routes>

        


    )
}

export default MainPage
