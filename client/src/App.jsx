import react from 'react';
import {Navbar} from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register';
import Home from './pages/Home';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';
import './App.css';
import Problem from './pages/Problem';
import Admin from './pages/Admin';

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if access token exists in local storage on page load
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Set isLoggedIn to true if access token is present
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn}/>}/>
        <Route path='/problem/:id' element={<Problem isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/admin' element={<Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default App;
