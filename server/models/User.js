const mongoose = require("mongoose");

// Defining the User Schema

const UserSchema = new mongoose.Schema({
    name : {type: String, required:true}, // Name of user
    email : {type: String,required:true,unique:true}, //  Email
    password: {type:String,required: true}, // Password
    role:{type:String,required:true}, // role, It have two values -> admin , participant.
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);