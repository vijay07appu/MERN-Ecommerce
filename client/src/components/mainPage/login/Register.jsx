import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [user,setUser]=useState({
        name:" ",
        email:" ",
        password:" "
    
    })


    const onChangeInput=(e)=>{
        const {name,value}=e.target;
        setUser({...user,[name]:value})

    }

    const registerSubmit=async(e)=>{
        e.preventDefault();
        try {
             await axios.post('http://localhost:5000/api/user/register', {...user});
             localStorage.setItem('firstRegister',true)
             window.location.href="/"
            // Handle successful login
            console.log('Register successful');
          } catch (err) {
            // Handle error
            alert(err.response.data.msg)
          }
    }

    
    return (
        <>
        <div className='register-page'>
            <form onSubmit={registerSubmit}>
            <input type='text' name='name' required placeholder='Enter Name :' value={user.name} onChange={onChangeInput}/>
                <input type='email' name='email' required placeholder='Enter Email :' value={user.email} onChange={onChangeInput}/>
                <input type='password' name='password' required placeholder='Enter Password :' value={user.password} onChange={onChangeInput}/>
                <div className='row'>
                    <button type='submit'>Register</button>
                    <Link to='/login'>Login</Link>
                </div>
            </form>


        </div>
        </>
        
    )
}

export default Register

