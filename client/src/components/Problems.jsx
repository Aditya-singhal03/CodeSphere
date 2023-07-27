import React, { useEffect, useState } from 'react'
import './Problems.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Problems = ({isTestCase,setIsQuestionChoosed}) => {
//     const problemsData = [
//     { name: 'Problem 1', difficulty: 'Easy', acceptanceRate: '85%' },
//     { name: 'Problem 2', difficulty: 'Medium', acceptanceRate: '70%' },
//     { name: 'Problem 3', difficulty: 'Hard', acceptanceRate: '45%' },
//   ];
  const [problems,setProblems] = useState([]);
  const [ currentPageNumber , setCurrentPageNumber ] = useState(1);
  const elementPerPage = 8;
  const lastidxElement = elementPerPage*currentPageNumber;
  const startidxElement = lastidxElement - elementPerPage;


  useEffect(()=>{
    const getProblems = async ()=>{
        try{
            const res = await axios.get("http://localhost:5000/question");
            setProblems(res.data);
        }catch(err){
            console.log(err);
        }
    }
    getProblems();
  },[]);

  const newProblemArray  = problems.slice(startidxElement,lastidxElement);
  let noOfButton = Math.floor(problems.length/elementPerPage);
  const temp = problems.length%elementPerPage;
  if(temp) noOfButton++;

  const getColorBasedOnDifficulty = (difficulty) => {
  if (difficulty === 'Easy') {
    return 'green'; // Set the color for 'Easy'
  } else if (difficulty === 'Medium') {
    return 'orange'; // Set the color for 'Medium'
  } else if (difficulty === 'Hard') {
    return 'red'; // Set the color for 'Hard'
  } else {
    return 'black'; // Set a default color if the difficulty is not recognized
  }
};

  return (
<div className='problems-container'>
    <h1>Problems</h1>
    <div className='Problems'>
        <table>
            <thead>
                <tr>
                    <th>Problem Name</th>
                    {!isTestCase && <th>Difficulty</th>}
                    {!isTestCase && <th>Acceptance</th>}
                </tr>
            </thead>
            <tbody>
                    {
                        newProblemArray.map((p,index)=>(
                            <tr key={index}>
                                {isTestCase?<td onClick={()=>setIsQuestionChoosed(p._id)}>{p.name}</td>:<td><Link to={`/problem/${p._id}`}>{p.name}</Link></td>}
                                {!isTestCase && <td 
                                style={{color : getColorBasedOnDifficulty(p.difficulty)}}
                                >{p.difficulty}</td>}
                                {!isTestCase && <td>{p.acceptance}</td>}
                            </tr> 
                        ))
                    }
            </tbody>
        </table>
        <div className='buttons'>
            {
                Array(noOfButton).fill(0).map((ele,idx)=>(
                    <button key={idx} onClick={()=>setCurrentPageNumber(idx+1)}>{idx+1}</button>
                    ))
                }
        </div>
    </div>
</div>
  )
}

export default Problems