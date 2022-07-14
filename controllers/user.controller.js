const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const bcryptjs = require("bcryptjs");
const { isEmpty } = require("../helper/validationFunction.helper")
const appError = require("../helper/apiError");
const responseMessage = require("../assets/responseMessage");


exports.createWallet = (req, res) => {
    const { userId, oldBalance, newBalance, walletAddress, status } = req.body;
    if( isEmpty(userId) && isEmpty(oldBalance) && isEmpty(newBalance) && isEmpty(walletAddress) && isEmpty(status) ){
        
    }else{
        console.log(isEmpty(userId))
        console.log(isEmpty(oldBalance))
        console.log(isEmpty(newBalance))
        console.log(isEmpty(walletAddress))
        console.log(isEmpty(status))
        appError.notFound(responseMessage.CREATE_WALLET_REQUIRED_MESSAGE);
    }
}
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