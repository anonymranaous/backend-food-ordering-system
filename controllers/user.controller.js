const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
    User.findOne({email: req.body.email}).exec((error, user) => {
        if(user){
            return res
                .status(400)
                .json({message:"User is Already registerd"});
        }
        if(error){
            return res
                .status(400)
                .json({error:"some error occured"});
        }

        const{
            userName,
            mobileNumber,
            email,
            password,
            // confirmPassword
        } = req.body;
        // if(password!= confirmPassword){
        //     return res
        //         .status(400)
        //         .json({error: "Password doesn't match"})
        // }

        const _user = new User({
            userName,
            mobileNumber,
            email,
            password,
        });
        _user.save((error, data) => {
            if(error){
                return res
                    .status(400)
                    .json({error:"user is not created, something went wrong"})
            }
        });

        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                data: "tastybites",
                _id: _user._id.toString()
            },
            process.env.JWT_SECRET
        );
        if (data) {
            return res
                .status(201)
                .json({ token })
        }
    });
};

const signin= (req, res) =>{
    console.log("hello");
    res.send("Hello")
};
module.exports = authController = {
    signup,
    signin
};