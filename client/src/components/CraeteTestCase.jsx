import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CraeteTestCase.css';

const CreateTestCase = () => {
  const [problems, setProblems] = useState([]);
  const [inputFromUser, setInputFromUser] = useState('');
  const [outputFromUser, setOutputFromUser] = useState('');
  const [questionId, setQuestionId] = useState('');

  useEffect(() => {
    const getProblems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/question');
        setProblems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProblems();
  }, []);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(inputFromUser);
    console.log(outputFromUser);
    console.log(questionId);
    const testCaseData = {inputFromUser,outputFromUser};
    try{
      const accessToken = localStorage.getItem('accessToken');
      const config ={
        headers:{
          token:`Bearer ${accessToken}`
        }
      };
      const res = await axios.put("http://localhost:5000/question/testcases/"+questionId,testCaseData,config);
      console.log(res.data);
    }catch(err){
      alert(err.response.data);
      console.log(err);
    }
  }

  return (
    <div className="create-test-case">
      <h3>Choose the Question</h3>
      <select defaultValue="" className="select-box" onChange={(e)=> setQuestionId(e.target.value)}>
        <option value="" disabled>
          Choose Question
        </option>
        {problems.map((pr, idx) => (
          <option key={idx} value={pr._id}>
            {pr.name}
          </option>
        ))}
      </select>
      <h3>Input of the Test Case</h3>
      <textarea
        value={inputFromUser}
        onChange={(e) => setInputFromUser(e.target.value)}
        className="input-textarea"
      />
      <h3>Output of the Test Case</h3>
      <textarea
        value={outputFromUser}
        onChange={(e) => setOutputFromUser(e.target.value)}
        className="output-textarea"
      />
      <button className="submit-button" onClick={handleSubmit}>Submit Test Case</button>
    </div>
  );
};

export default CreateTestCase;
