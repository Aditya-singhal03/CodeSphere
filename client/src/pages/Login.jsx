import React from 'react'
import './Login.css';
import { useState } from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {

  const [email,setEmail]  = useState("");
  const [password,setPassword]  = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleClick = async  (e) =>{
    e.preventDefault();
    const user = {email,password};
    try{
      const res = await axios.post("http://localhost:5000/auth/login" , user);
      setIsLoggedIn(true);
      localStorage.setItem('accessToken',res.data.accessToken);
      setRedirectToHome(true); 
    }catch(err){
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data);
        console.log(errorMessage);
    } else {
        setErrorMessage("An error occurred. Please try again.");
    }
    }
  }
  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className='container'>
        <div className='Login'>
            <h1>Login</h1>
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <form action="">
                <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className='login-button' onClick={handleClick}>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login