import React, { useEffect, useState } from 'react'
import './Problem.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';

const Problem = ({isLoggedIn,setIsLoggedIn}) => {
  const location = useLocation();
  const questionId = location.pathname.split('/')[2]; 

  const [problem, setProblem] = useState({});
  const [solution , setSolution]  = useState("");
  const [submisionStatus,setSubmisionStatus] = useState("");
  const [isLoading , setIsLoading] = useState(false);
  const [dotNumber,setDotNumber] = useState(0);
  const [isProblem , setIsProblem] = useState(true);
  const [submissions,setSubmissions] = useState([]);
  
  useEffect(() => {
    const getProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/question/${questionId}`);
        setProblem(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProblem();
  }, [questionId]);

  const renderLineBreaks = (text)=>{
    const lines = text===undefined?[]:text.split('\n');
    return lines.map((line,index)=>(
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleChange = (e)=>{
    setSolution(e.target.value);
  }

  const handleClick = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    
    //**SPHERE ENGINE CODE**//
    
    // const submissionData = {
    //   code:solution,
    // }
    // try{
    //   const res = await axios.post(`http://localhost:5000/solution/${questionId}`,submissionData);
    //   setSubmisionStatus(res.data);
    // }catch(err){
    //   console.log(err)
    // }
    const accessToken = localStorage.getItem('accessToken');
    const config = {
      headers:{
        token: `Bearer ${accessToken}`,
      },
    };
    const submissionData = {
      problemId: questionId,
      code: solution,
      language: "Cpp",
    };
    console.log(submissionData);
    try{
      const res = await axios.post('http://localhost:5000/submission/post',submissionData,config);
      console.log(res.data);
    }catch(err){
      alert(err.response.data);
      console.log(err);
      setIsLoading(false);
      return;
    }
    await getSubmissions();
    setIsProblem(false);
    setTimeout(async ()=>await getSubmissions(),4000);
    setIsLoading(false);
  }

  useEffect(()=>{
    let timer;
    if(isLoading){
      timer = setInterval(()=>{
        setDotNumber((prev)=> (prev+1)%4);
      },500);
    }

    return ()=>{
      clearInterval(timer);
    };
  },[isLoading]);

  const giveLoadingText =  ()=>{
    let dots = ".".repeat(dotNumber);
    return "Submitting"+dots;
  }
  const getSubmissions = async ()=>{
    const accessToken = localStorage.getItem('accessToken');
    const config = {
      headers:{
        token: `Bearer ${accessToken}`,
      },
    };
    try{
      const res = await axios.get(`http://localhost:5000/submission/${questionId}`,config);
      console.log(res.data);
      setSubmissions(res.data);
    }catch(err){
      alert(err.response.data);
      console.log(err);
    }

  }
  const handleClickofSubmissionsButton = async ()=>{
    await getSubmissions();
    if(submissions.length!==0){
      setIsProblem(false);
    }
  }
  const funcText = (status)=>{
    if(status==="Accepted") return "green";
    else return "red";
  }
   return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='problem'>
                  <div className='problem-container'>
                    <div className="buttons-container">
                      <button onClick={() => setIsProblem(true)}>Problem</button>
                      <button onClick={handleClickofSubmissionsButton}>Submissions</button>
                    </div>
                    <div className='panels'>
                      <div className={`problem-sidebar ${isProblem ? 'show' : 'hide'}`}>
                          {/* Problem sidebar content */}
                          <h1>{problem.name}</h1>
                          <p>{problem.description}</p>
                          <h3>Input Specification</h3>
                          <p>{problem.inputSpecification}</p>
                          <h3>Output Specification</h3>
                          <p>{problem.outputSpecification}</p>
                          <h3>Input Example Test Case</h3>
                          <p>{renderLineBreaks(problem.exampleTestCaseInput)}</p>
                          <h3>Output Example Test Case</h3>
                          <p>{renderLineBreaks(problem.exampleTestCaseOutput)}</p>
                      </div>
                      <div className={`submission-sidebar ${isProblem ? 'hide' : 'show'}`}>
                           <div className='indi-sub'>
                           {submissions.map((sub) => (
                             <React.Fragment key={sub._id}>
                                <div className='sub-pannel-status'>
                                <h3 style={{color: funcText(sub.status)}}>{sub.status}</h3>
                                <div className='lang'>{sub.language}</div>
                                </div>
                                <div className="text-xs">
                                {new Date(sub.submittedAt).toLocaleString("en-us", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                })}
                                </div>
                              </React.Fragment>
                                            ))}
                      </div>
                      </div>
                    </div>
                  </div>
                 <div className='code-area'>
                    <select defaultValue={""}>
                      <option value="">Choose language</option>
                      <option value="">C++</option>
                    </select>
                    <textarea placeholder='Code here' value={solution} onChange={handleChange} />
                        <div className='lower-right'>
                        <button className='problem-submit' onClick={handleClick}>
                          {isLoading ? giveLoadingText() : 'Submit'}
                          </button>
                          <h2>{submisionStatus}</h2>
                          </div>
                        </div>
                   </div>
         </div>
  );
};

export default Problem;
