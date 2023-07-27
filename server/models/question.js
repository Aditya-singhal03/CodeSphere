const mongoose = require("mongoose");

// Question Model , Involves all the essential part to make a Good , descriptive question.

const QuestionSchema = new mongoose.Schema({
    name : {type: String, required:true,unique:true}, // name of question
    description : {type: String,required:true}, // Description of question
    inputSpecification : {type: String,required:true}, // Input description, in what order input will be given.
    outputSpecification : {type: String,required:true}, // Output description for how the Output should be printed, very important for submision verification.
    exampleTestCaseInput: {type:String,required: true}, // Example test case Input
    exampleTestCaseOutput: {type:String,required: true}, // Example test case Output
    testCasesInput: {type:Array}, // Array Maintaining the inputs of the testCases of question
    testCasesOutput: {type:Array}, // Array Maintaining the outputs of the testCases of question
    sphereEngineQuestionId: { type: String }, // Sphere engine Id of the question
    difficulty: {type:String, required:true},
    acceptance: {type: String, required: true},
},{timestamps:true});

module.exports = mongoose.model("question",QuestionSchema);