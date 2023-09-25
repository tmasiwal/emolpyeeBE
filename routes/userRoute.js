const express= require('express');
const {UserModel,BlacklistModel}=require('../model/userModel')
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');

const userRouter= express.Router() ;

userRouter.post('/signup',async(req,res)=>{

    try{
        const {email}=req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(200).send({"msg": "user already registered place login"})
        }
        else{

            const {email,password} = req.body;
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(400).send({"msg": err.message})
                }
                else{
                    const newUser= new UserModel({email,password:hash})
                    await newUser.save();
                    res.status(200).send({"msg":"User login successful"})

                }
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

userRouter.post ('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user = await UserModel.findOne({email:email});
  
    if(user){
        bcrypt.compare(password, user.password, function(err, result) {
       
            if(err){
                res.status(400).send({"msg":err.message})  
            }
           if(result) {
                var token=jwt.sign({userID:user._id},"tanuj",{expiresIn:"7d"})
       res.status(200).send({"msg":"success login ",token})
            }
            else{
                res.status(400).send({"msg":"invalid password"})
            }
        });
       
    }
    else{
        res.status(400).send({"msg":"invalid email address"})
    }
})

userRouter.get('/logout',async(req, res, next)=>{
    const token =req.headers.authorization
    const newToken =new BlacklistModel({token})
    await newToken.save();
    res.send({"msg":"success logout"})
})




module.exports = {userRouter}