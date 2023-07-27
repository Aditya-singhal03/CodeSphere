import React, { useEffect, useState } from 'react'
import './CreateQuestion.css';
import axios from 'axios';

const CreateQuestion = () => {
  const questionObject = {
    name:'',
    description : '', // Description of question
    inputSpecification : '', // Input description, in what order input will be given.
    outputSpecification : '', // Output description for how the Output should be printed, very important for submision verification.
    exampleTestCaseInput: '', // Example test case Input
    exampleTestCaseOutput: '', // Example test case Output, 
    difficulty: '',
    acceptance: '',
  }
  const [questionData , setQuestionData]  = useState(questionObject);
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setQuestionData((prev)=>({...prev , [name]:value}));
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log("questionData :" ,questionData);
    try{
      const accessToken = localStorage.getItem('accessToken');
      const config ={
        headers:{
          token:`Bearer ${accessToken}`
        }
      };
      const res = await axios.post("http://localhost:5000/question",questionData,config);
      console.log(res.data);
    }catch(err){
      alert(err.response.data);
      console.log(err);
    }
  }
  return (
    <div className='Create-Question'>
      <form onSubmit={handleSubmit}>
        <h3>Name : </h3>
        <textarea placeholder='Name' value={questionData.name} name='name' onChange={handleChange} ></textarea>
        <h3>Description : </h3>
        <textarea placeholder='Description' value={questionData.description} name='description' onChange={handleChange}></textarea>
        <h3>Input Specification : </h3>
        <textarea placeholder='Input Specification' value={questionData.inputSpecification} name='inputSpecification' onChange={handleChange}></textarea>
        <h3>Output Specification : </h3>
        <textarea placeholder='Output Specification' value={questionData.outputSpecification} name='outputSpecification' onChange={handleChange}></textarea>
        <h3>Example Test Case Input :</h3>
        <textarea placeholder='Example Test Case Input' value={questionData.exampleTestCaseInput} name='exampleTestCaseInput' onChange={handleChange}></textarea>
        <h3>Example Test Case Output :</h3>
        <textarea placeholder='Example Test Case Output' value={questionData.exampleTestCaseOutput} name='exampleTestCaseOutput' onChange={handleChange}></textarea>
        <h3>Difficulty</h3>
        <select defaultValue="" value={questionData.difficulty} name='difficulty' onChange={handleChange}>
          <option value="" disabled>Choose Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <h3>Acceptance Rate : </h3>
        <textarea placeholder='Acceptance Rate' value={questionData.acceptance} name='acceptance' onChange={handleChange}></textarea>
        <button type='submit'>Submit Question</button>
      </form>
    </div>
  )
}

export default CreateQuestion