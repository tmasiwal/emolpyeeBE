const mongoose = require('mongoose');
const employeeSchema= mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    department:String,
    salary:Number
},{
    versionKey:false
})

const EmployeeModel= mongoose.model("employees",employeeSchema);



module.exports={EmployeeModel}


/*
"first_name":"Tanuj",
"last_name":"Masiwal",
"email":"tanuj@gmail.com",
"department":"Tech",
"salary":450000

*/