import React, { useContext } from 'react';
import { MdOutlineMenu, MdClose, MdOutlineShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Header.css';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState);
    const [isLogged,setIsLogged] = state.userApi.isLogged;
    const [isAdmin,setIsAdmin] = state.userApi.isAdmin;
    const [cart] = state.cartApi.cart || [];

    const logoutUser = async () => {
        await axios.get('http://localhost:5000/api/user/logout');
        localStorage.clear();
        setIsAdmin(false);
        setIsLogged(false);
    };

    const adminRouter = () => (
        <>
            <li><Link to='/create-product'>Create Product</Link></li>
            {/* <li><Link to='/category'>Categories</Link></li> */}
        </>
    );

    const loggedRouter = () => (
        <>
            <li><Link to='/history'>History</Link></li>
            <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
        </>
    );

    return (
        <>
            <header>
                <div className='menu'>
                    <MdOutlineMenu size={30} />
                </div>
                <div className='logo'>
                    <h1><Link to='/'>{isAdmin ? 'Admin' : 'Shoppi'}</Link></h1>
                </div>

                <ul>
                    <li><Link to='/'>{isAdmin ? 'Products' : 'Shoppi'}</Link></li>

                    {isAdmin && adminRouter()}
                    {isLogged ? loggedRouter() : <li><Link to='/login'>Login or Register</Link></li>}
                    
                    <li><MdClose size={30} className='menu' /></li>
                </ul>
                {!isAdmin && (
                    <div className='cart-icon'>
                        <span>{isLogged ? (cart || []).reduce((acc, item) => acc + item.quantity, 0) : 0}</span>
                        <Link to='/cart'><MdOutlineShoppingCart size={30} /></Link>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;

