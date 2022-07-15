const userModel = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { isEmpty, validateEmail, validatePassword } = require("../helper/validationFunction.helper")


exports.createUser = (req, res) => {
    const { email, name, userName, mobileNumber, password, dateOfBirth, address, city, state, country, countryCode, gender, profilePic, coverPic, otpVerification, otpTime, otp } = req.body;
    try {

        if(isEmpty(name) && isEmpty(userName) && isEmpty(email) && isEmpty(password) && isEmpty(mobileNumber) && isEmpty(countryCode) && isEmpty(country)){
            if(!validateEmail(email)){
                return res.status(500).send({ status: "error", message: "Email not valid" });    
            }
    
            if(!validatePassword(password)){
                return res.status(500).send({ status: "error", message: "Password Not Valid required special char, numeric or chararacters" });    
            }
    
            let hashpassword = bcryptjs.hashSync(password, 8);
            req.body.password = hashpassword;
            const userAdding = new userModel(req.body);
            userAdding.save().then(() => {
                return res.status(200).send({ status: "success", message: "Registration Sucessfully" });
            }).catch((error) => {
                return res.status(500).send({ status: "error", message: error });    
            })
        }else{
            return res.status(500).send({ status: "error", message: "Required Name, Email, Password, Mobile Number, Country Code or Country." });    
        }

    } catch (error) {
        res.status(500).send({ status: "error", message: error });
    }
}
exports.UserLogin = async (req,res)=>{    
    const{email,password}=req.body;
    if(email && password){
        let user = await userModel.findOne({email:email});
        if(user){
            let check = await bcryptjs.compareSync(password, user.password);
            console.log(check);
            if(check){
                let token = jwt.sign({userId:user._id},process.env.Secret,{expiresIn:"10 min"});
                return  res.status(200).json({status:"Success",message:"Login Successfully","token valid for 10 min":"token","token":token});

            }else{
                return res.status(500).json({status:"error", message:"Email or Password is Not Valid"});
            }

        }else{
            return res.status(500).json({status:"error",message:"user doesn't exits"});
        }

    }else{
        return res.send(500).json({status:"error",message:"Please enter valid email and password"});
    }
}
<<<<<<< HEAD
exports.transaction = async (req,res) =>{
    const { newBalance, walletAddress } = req.body;
    let userId = req.params.userId;
    if(newBalance){
        return res.status(400).json({message:"Enter the Balance"});
    }
    if(walletAddress){
       return res.status(400).json({message:"Enter the Wallet Address"});
    }
    let user = await Wallet.findById({_id: userId})
    if(user){
        try {
            let oldBalance = user.oldBalance;
        let doc = new Wallet({
            userId,
            oldBalance,
            newBalance,
            walletAddress
        });
        doc.save();
        res.status(200).json({status:"Success", message:"transaction successfully"})
        } catch (error) {
           res.status(400).json({status:"success",message:"Transaction Failed due to server error"});
        }
    }else{
        return res.status(400).json({message:"User doesn't exists"})
    }

}
=======
>>>>>>> 42bdd5a064c40f2ed7bdc35d41fd0615af83919c
