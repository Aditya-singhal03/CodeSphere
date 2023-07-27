import React from 'react';
import './Navbar.css';
import { Link,useNavigate  } from 'react-router-dom';

export const Navbar = ({isLoggedIn,setIsLoggedIn}) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleClick = ()=>{
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/'); 
  }
  return (
    <div className='Navbar'>
      <Link to="/"><h1>CodeItOut</h1></Link>
      { !isLoggedIn &&  <Link to="/login">Login</Link>}
      { !isLoggedIn &&  <Link to="/register">SignUp</Link>}
      {isLoggedIn && <button className='Navbar-button' onClick={handleClick} >Logout</button>}
      <Link to="/admin">Admin Pannel</Link>
    </div>
  )
}
