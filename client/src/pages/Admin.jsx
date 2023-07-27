import React, { useState } from 'react'
import './Admin.css';
import { Navbar } from '../components/Navbar';
import CreateQuestion from '../components/CreateQuestion';
import CraeteTestCase from '../components/CraeteTestCase';

const Admin = ({isLoggedIn,setIsLoggedIn}) => {
  const [isCreateQuestion , setIsCreateQuestion] = useState(true);
  return (
    <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div className='Admin-option'>
            <button onClick={()=>setIsCreateQuestion(true)}>Create Question</button>
            <button onClick={()=>setIsCreateQuestion(false)}>Create Test Cases</button>
        </div>
        {isCreateQuestion?<CreateQuestion/>:<CraeteTestCase/>}
    </div>
  )
}

export default Admin