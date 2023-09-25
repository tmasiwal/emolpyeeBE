const mongoose=require('mongoose');
require('dotenv').config();

const connectionn=mongoose.connect(process.env.mongooseURL)

module.exports={connectionn}