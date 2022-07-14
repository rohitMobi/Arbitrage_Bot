const userModel = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const bcryptjs = require("bcryptjs");
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