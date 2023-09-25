const express= require('express');
const cors=require('cors');
const {connectionn}=require('./db');
const {userRouter}=require("./routes/userRoute");
const {employeeRouter} =require("./routes/employeeroute")
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/employees",employeeRouter);

app.listen(4500,async()=>{
    try{
        await connectionn
        console.log("connected to db")
        console.log('port is running at http://localhost:4500')
    }
    catch(err){
        console.log(err);
    }
})