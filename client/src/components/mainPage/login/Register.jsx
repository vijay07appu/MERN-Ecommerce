import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Register.css'

function Register() {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""

    });


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://mern-ecommerce-2-k26v.onrender.com/api/user/register', { ...user },{
                headers: {
                    
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            localStorage.setItem('firstRegister', true)
            window.location.href = "/"
            // Handle successful register
            console.log('Register successful');
        } catch (err) {
            // Handle error
            alert(err.response.data.msg)
        }
    }


    return (
        <>
            <div className='register-body'>
                <div className='container'>
                    <div className='register-page'>
                        <h2>Register</h2>
                        <form onSubmit={registerSubmit}>
                            <div class="input-box">
                                <input type="text" name="name" required placeholder="Enter Name :" value={user.name} onChange={onChangeInput}/>
                            </div>
                            <div class="input-box">
                                <input type="email" name="email" required placeholder="Enter Email :" value={user.email} onChange={onChangeInput}/>
                            </div>
                            <div class="input-box">
                                <input type="password" name="password" required placeholder="Enter Password :" value={user.password} onChange={onChangeInput}/>
                            </div>
                            <div className='row'>
                            <button className="btn" type='submit'>Register</button>
                                <p className='login-link'>Already have an Account? <Link to='/login'>Login</Link></p>

                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>

    )
}

export default Register

