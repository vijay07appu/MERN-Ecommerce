import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: ""

    })


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://mern-ecommerce-2-k26v.onrender.com/api/user/login', { ...user });

            console.log("res for login is ")
            console.log(res)
            localStorage.setItem('firstLogin', true)
            window.location.href = "/"
            console.log('Login successful');
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <>
            <div className='login-body'>
                <div className='container'>
                    <div className='login-page'>
                        <h2>Login</h2>
                        <form onSubmit={loginSubmit}>
                            <div className='input-box'>
                               
                                <input type='email' name='email' required placeholder='Enter Email :' value={user.email} onChange={onChangeInput} />
                               
                                <input type='password' name='password' required placeholder='Enter Password :' value={user.password} onChange={onChangeInput} />
                            </div>
                            <div className='row'>
                                <button className="btn" type='submit'>Login</button>
                                <p className='register-link'>Don't have an account? <Link to='/register'>Register</Link></p>


                            </div>
                        </form>


                    </div>
                </div>
            </div>


        </>

    )
}

export default Login
