const express=require('express');

const {EmployeeModel}=require('../model/employeeModel');
const {auth}=require('../middleware/auth')

const employeeRouter= express.Router();


employeeRouter.get("/",auth,async(req,res)=>{
const page= parseInt(req.query.page)||1
const q={}
q.userId=req.body.userId;
if(req.query.department){
    q.department=req.query.department
}
if(req.query.first_name){
    q.first_name=req.query.first_name
}
let ord;
let data;
if(req.query.sort){

    if(req.query.sort=="asc"){
        data= await EmployeeModel.find(q).sort({salary:1}).skip((page-1)*5).limit(5).exec();  
    }
    else{
        data= await EmployeeModel.find(q).sort({salary:-1}).skip((page-1)*5).limit(5).exec();  
    }
}
else{ data= await EmployeeModel.find(q).skip((page-1)*5).limit(5).exec();}
if(data){
    res.status(200).send({"msg":"success",data})
}
else{
    res.send({"msg":"error"});
}

})

employeeRouter.post("/add",auth,async(req,res)=>{
    const data= new EmployeeModel(req.body)
    await data.save();
    res.send({"msg":"successfully employee is added "})
})

employeeRouter.patch("/update/:id",auth,async(req,res)=>{
const {id}=req.params;
const employee= await EmployeeModel.findOne({_id:id})
try{
    if(req.body.userId!==employee.userId){
        res.status(400).send({"msg":" you are not authorized to update"});
    }
    else{
        await EmployeeModel.findByIdAndUpdate(id, req.body);
    }
}
catch(err){
    res.status(500).send(err.message)
}

});


employeeRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const employee= await EmployeeModel.findOne({_id:id})
    try{
        if(req.body.userId!==employee.userId){
            res.status(400).send({"msg":" you are not authorized to delete"});
        }
        else{
            await EmployeeModel.findByIdAndDelete(id);
        }
    }
    catch(err){
        res.status(500).send(err.message)
    }
    
    });




module.exports={employeeRouter}