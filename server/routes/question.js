const  router = require("express").Router();
const question = require('../models/question');
const axios = require('axios');
const { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("./verifyToken");
const access_token = process.env.Access_Token;

//Add question ( Admin Only )
// Added middle ware to give excess only to admin
router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    console.log(req.body);
    const newQuestion = new question(req.body); // new question is made and stored in DB.

    try{
        const savedQuestion = await newQuestion.save();
        //******************Sphere Engine Part start*******************//
        // Uploading question to Sphere Engine
        // const problemData = {
        //     name: savedQuestion.name,
        //     masterjudgeId: 1000,
        //     //making body of question from the data provided by the admin. Combining different part in appropraite mannner to create a fully descriptive question.
        //     body: `${savedQuestion.description}\n\n**Input**:\n${savedQuestion.inputSpecification}\n\n**Output**:\n${savedQuestion.outputSpecification}\n\n**Example**:\n\nInput:\n\n${savedQuestion.exampleTestCaseInput}\n\nOutput:\n\n${savedQuestion.exampleTestCaseOutput}`
        // };

        // // Making post request to upload question
        // const response = await axios.post(`https://c3e7a099.problems.sphere-engine.com/api/v4/problems?access_token=${access_token}`, problemData);
        // const sphereEngineQuestionId = response.data.id;

        //  // Update the question document with the Sphere Engine question ID

        //  savedQuestion.sphereEngineQuestionId = sphereEngineQuestionId;
        //  const newSavedQuestion = await savedQuestion.save();
        //******************Sphere Engine Part End*******************//

        res.status(200).json(savedQuestion); //res.status(200).json(newSavedQuestion); <- for SPhere Engine
    }catch(err){
        res.status(500).json(err);
    }
});

//Edit Question ( Admin only )

router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        // updated the question in DB.
        const updatedQuestion = await question.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});

        // Update the question on Sphere Engine

        // taking updated question from DB to make updated question to upload to Sphere engine.
        const problemData = {
            name: updatedQuestion.name,
            body:`${updatedQuestion.description}\n\n**Input**:\n${updatedQuestion.inputSpecification}\n\n**Output**:\n${updatedQuestion.outputSpecification}\n\n**Example**:\n\nInput:\n\n${updatedQuestion.exampleTestCaseInput}\n\nOutput:\n\n${updatedQuestion.exampleTestCaseOutput}`
        }

        // making request to update on sphere engine
        const response = await axios.put(`https://c3e7a099.problems.sphere-engine.com/api/v4/problems/${updatedQuestion.sphereEngineQuestionId}?access_token=${access_token}`,problemData)
        const statusCode = response.status;

        if (statusCode === 200) {
            console.log(200);
        } else {
            // Handle the error response from Sphere Engine
            const errorResponse = response.data;
            console.log(statusCode);
            console.log("error ",errorResponse);
        }
        res.status(200).json(updatedQuestion);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete Question ( Admin Only )

router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        //Delete question from DB
        const deletedQuestion = await question.findByIdAndDelete(req.params.id);

        // Delete the question from Sphere Engine
        await axios.delete(`https://c3e7a099.problems.sphere-engine.com/api/v4/problems/${deletedQuestion.sphereEngineQuestionId}?access_token=${access_token}`);


        res.status(200).json("Question has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

// Add test Cases to a problem. ( Admin Only )

router.put("/testcases/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{    
            // taking input and output of test case from forntend in form of a string, which involve proper line breaks according to problem description
            const { inputFromUser, outputFromUser } = req.body;
            console.log(inputFromUser);
            console.log(outputFromUser);
            // pushing the input and output of test Case into the array of inputs of testCase and outputs of testCase. Basically i have used a array in DB to store testCases, so pushing into that array.
            const updatedQuestion = await question.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { testCasesInput:inputFromUser , testCasesOutput:outputFromUser }
                },
                { new: true }
            );
            //**********Sphere Engine part *******************//
            // Add test cases to Sphere Engine question.
            // let testcaseData = {
            //     input: inputFromUser,
            //     output: outputFromUser,
            //     timelimit: 5,
            //     judgeId: 1
            // };
            // console.log(testcaseData);
            // // made request to add testCase to the question
            // const response = await axios.post(`https://c3e7a099.problems.sphere-engine.com/api/v4/problems/${updatedQuestion.sphereEngineQuestionId}/testcases?access_token=${access_token}`,testcaseData);
            res.status(200).json(updatedQuestion);
        }catch(err){
            res.status(500).json(err);
        }
});


//Get questions
router.get('/',async (req,res)=>{
    try{
        const questionArray = await question.find();
        res.status(200).json(questionArray);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get question by Id

router.get('/:id',async(req,res)=>{
    try{
        const targetQuestion = await question.findById(req.params.id);
        res.status(200).json(targetQuestion);
    }catch(err){
        res.status(500).json(err);
    }
})




module.exports = router;