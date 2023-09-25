const mongoose = require('mongoose');
const userSchema= mongoose.Schema({
    email:String,
    password:String
},{
    versionKey:false
})

const UserModel= mongoose.model("users",userSchema);

//backlisting

const blacklistSchema=mongoose.Schema({
    token:String,
},{
    versionKey:false
})
const BlacklistModel=mongoose.model("blacklists",blacklistSchema);

module.exports={UserModel,BlacklistModel}