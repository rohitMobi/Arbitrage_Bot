const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

exports.verify = async (req,res,next) =>{
    try {
        let token = req.headers.authorization.split(" ")[1];
         const {userId} = jwt.verify(token, process.env.Secret);
         
         req.user = userId;
         next();
    } catch (error) {
        res.send({responseCode:"409", responseMessage:"Unauthorized User"})
    }
}

exports.verifyAdmin = async (req,res,next) =>{
    const userId = req.user;
    console.log(userId)
    let user = await userModel.findById({_id:userId});
    if(user.userType == "ADMIN"){
        next();
    }else{
        return res.send({responseCode:409, responseMessage:"Only Admin have Access"})
    }
    console.log(user);   
}