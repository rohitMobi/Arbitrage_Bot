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