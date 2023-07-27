import React from 'react';
import { Navbar } from '../components/Navbar';
import './Home.css';
import Problems from '../components/Problems'

const Home = ({isLoggedIn,setIsLoggedIn}) => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Problems></Problems>
    </div>
  )
}

export default Home;
