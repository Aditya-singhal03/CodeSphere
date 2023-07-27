const  router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//SignUp() functionality

router.post("/register",async (req,res)=>{
    // making the user from the data sent from the frontend. 
    const newUser = new User({
        name: req.body.name,
        email : req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.Password_Security_Key).toString(), // CryptoJs library for storing ecrypted password in DB.
        role : req.body.role,// Two possible roles :- admin , participant
    });

    try{
        const savedUser = await newUser.save();
        let email = savedUser.email;
        //Generating the access token using JWT , using the id and role attribute of user. A security key is also provided.
        const accessToken = jwt.sign({
                id:savedUser._id,
                role: savedUser.role,
            },
            process.env.JWT_Security_Key,
            {expiresIn:"1d"}
        );
        res.status(201).json({email ,accessToken});
    }catch(err){
        res.status(500).json(err);
    }
});

//Login() functionality

router.post("/login",async(req,res)=>{
    console.log(req.body);
    const user = await User.findOne({email:req.body.email}); //finding user using email
    if(user===null){
         return res.status(401).json("No User found with this email");
    }
    console.log("Check 1");
    console.log(user)
    const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.Password_Security_Key); // decrypting the password from DB.
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if(originalPassword!==req.body.password){ // comapring the provided password with original one.
        return res.status(401).json("wrong password provided");
    }
    //Generating the access token using JWT , using the id and role attribute of user. A security key is also provided.
    const accessToken = jwt.sign({
        id:user._id,
        role: user.role,
    },
    process.env.JWT_Security_Key,
    {expiresIn:"1d"}
    );
    const email = user.email;
    res.status(200).json({email,accessToken});
})

module.exports = router;