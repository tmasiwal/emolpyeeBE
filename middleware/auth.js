const jwt= require('jsonwebtoken')

const auth=(req,res,next)=>{

    const token= req.headers.authorization
    let decoded= jwt.verify(token,"tanuj");
    if(decoded){
        req.body.userID=decoded.userID
    next();
    }
    else{
        res.send({"msg":"Login again."})
    }
}

module.exports={auth}