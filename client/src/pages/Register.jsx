import React from 'react';
import './Register.css';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = ({setIsLoggedIn}) => {
  const [role,setRole] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage, setErroMessage] = useState("");
  const navigate = useNavigate();
  const  handleClick= async (e)=>{
    e.preventDefault();
    const user = {name,email,password,role};
    try{
      const res = await axios.post("http://localhost:5000/auth/register" , user);
      setIsLoggedIn(true);
      localStorage.setItem('accessToken',res.data.accessToken);
      navigate("/");
    }catch(err){
      console.log(err);
    }

  }
  return (
    <div className='container'>
        <div className='Register'>
            <h1>Register</h1>
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <form action="">
                <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}  />
                <input type="text" placeholder='Email' value= {email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='Password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className='toggle-conatiner'>
                  <span>Role :</span>
                  <label >
                    <input type="radio"  checked={role==='Admin'} onChange={(e)=>setRole('Admin')}/>
                    Admin
                  </label>
                  <label >
                    <input type="radio"  checked={role==='Participant'} onChange={(e)=>setRole('Participant')}/>
                    Participant
                  </label>
                </div>
                <button onClick={handleClick}>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register