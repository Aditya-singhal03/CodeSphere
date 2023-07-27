const  router = require("express").Router();
const question = require('../models/question');
const axios = require('axios');
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("./verifyToken");
const access_token = process.env.Access_Token;

//Taking Solution from the user and giving response about its exucution result.

router.post("/:id",async(req,res)=>{
    try{
        //first retriving the question from the DB whose solution is to be submitted. We will use its Sphere engine Id to connect to it in Sphere engine.
        const Question = await question.findById(req.params.id);
        
        //making string of testCases on which evaluation has to be done
        let str = "";
        for(let i=0;i<Question.testCasesInput.length;i++){
            str+=i.toString();
            if(i!==Question.testCasesInput.length-1)str+=",";
        }
        const submissionData = {
            problemId: Question.sphereEngineQuestionId,
            compilerId: 1, // compiler Id 1 is for C++ code.
            source:req.body.code, // taking code from frontend in form of string, proper line break has to be given in the string.
            tests: str, // test cases to be used in form string separated by commas
        }

        // making the submission
        const submissionResponse  = await axios.post(`https://c3e7a099.problems.sphere-engine.com/api/v4/submissions?access_token=${access_token}`,submissionData);
        // After submission take the id of submission to check its status
        const submissionId = submissionResponse.data.id;
        console.log(submissionId);
        // Wait for a time gap before checking the submission status, this is beacuse Sphere engine take some time to compile and run the code.
        await new Promise((resolve) => setTimeout(resolve, 10000));

        //Checking the Status. Sending request with submission Id.
        const statusResponse = await axios.get(`https://c3e7a099.problems.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=${access_token}`);
        const submissionStatus = statusResponse.data;

        //If the executing parametre is still true means its still running, execution is not completed,  so again wait for some time.
        if(submissionStatus.executing === true){
            await new Promise((resolve) => setTimeout(resolve, 15000));
            statusResponse = await axios.get(`https://c3e7a099.problems.sphere-engine.com/api/v4/submissions/${submissionId}?access_token=${access_token}`);
            submissionStatus = statusResponse.data;
        }
        //Checking the status of the submission, It give different result -> Wrong answer , Accepted , Time Limet Executed, Compilation Error.
        console.log(submissionStatus)
        res.status(200).json(submissionStatus.result.status.name);

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;