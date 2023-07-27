const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    problemId : {type:String, required:true},
    userId : {type:String, required:true},
    code : {type:String , required:true},
    status: {type:String , enum: ["Pending", "Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error","Compilation Error"] , default:"Pending"},
    submissionId: {type:Number,required:true},
    language : {type:String,required:true},
    submittedAt: {
      type: Date,
      default: Date.now,
    },
});

const submissionArraySchema  = new mongoose.Schema({
    submissions: [submissionSchema]
})

const submissionsArray = mongoose.model("submissionsArray",submissionArraySchema);

module.exports = submissionsArray;