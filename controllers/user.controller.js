const userModel = require("../models/user.model");
const Wallet = require("../models/wallet.model");
const transaction = require("../models/transaction.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniswapSchema = require("../models/uniswap");
const uniswapWeb3 = require('../Uniswap/uniswapWeb3')
const {
  isEmpty,
  validateEmail,
  validatePassword,
} = require("../helper/validationFunction.helper");

exports.createUser = (req, res) => {
  const {
    email,
    name,
    userName,
    mobileNumber,
    password,
    dateOfBirth,
    address,
    city,
    state,
    country,
    countryCode,
    gender,
    profilePic,
    coverPic,
    otpVerification,
    otpTime,
    otp,
  } = req.body;
  try {
    if (
      isEmpty(name) &&
      isEmpty(userName) &&
      isEmpty(email) &&
      isEmpty(password) &&
      isEmpty(mobileNumber) &&
      isEmpty(countryCode) &&
      isEmpty(country)
    ) {
      if (!validateEmail(email)) {
        return res
          .status(500)
          .send({ status: "error", message: "Email not valid" });
      }

      if (!validatePassword(password)) {
        return res.status(500).send({
          status: "error",
          message:
            "Password Not Valid required special char, numeric or chararacters",
        });
      }

      let hashpassword = bcryptjs.hashSync(password, 8);
      req.body.password = hashpassword;
      const userAdding = new userModel(req.body);
      userAdding
        .save()
        .then(() => {
          return res
            .status(200)
            .send({ status: "success", message: "Registration Sucessfully" });
        })
        .catch((error) => {
          return res.status(500).send({ status: "error", message: error });
        });
    } else {
      return res.status(500).send({
        status: "error",
        message:
          "Required Name, Email, Password, Mobile Number, Country Code or Country.",
      });
    }
  } catch (error) {
    res.status(500).send({ status: "error", message: error });
  }
};

exports.UserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    let user = await userModel.findOne({ email: email });
    if (user) {
      let check = await bcryptjs.compareSync(password, user.password);
      console.log(check);
      if (check) {
        let token = jwt.sign({ userId: user._id }, process.env.Secret, {
          expiresIn: "10 min",
        });
        return res.status(200).json({
          status: "Success",
          message: "Login Successfully",
          "token valid for 10 min": "token",
          token: token,
        });
      } else {
        return res
          .status(500)
          .json({ status: "error", message: "Email or Password is Not Valid" });
      }
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "user doesn't exits" });
    }
  } else {
    return res.send(500).json({
      status: "error",
      message: "Please enter valid email and password",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    let result = await userModel.find();
    res.status(200).json({ status: "Success", result });
  } catch (error) {
    res.send({ responseCode: 404, responseMessage: "Unable to Load" });
  }
};

exports.addWalletMoney = async (req, res) => {
  const { userBalance, walletAddress } = req.body;
  let userId = req.params.userId;
  let userResult = await userModel.findOne({
    userId: userId,
    status: "ACTIVE",
  });
  if (!userResult) {
    return res.send({ responseCode: 404, responseMessage: "User not found." });
  }
};
exports.withdrawAmount = async (req, res) => {
  const { amount } = req.body;
  let userId = req.params.userId;
  let userResult = await userModel.findOne({
    userId: userId,
    status: "ACTIVE",
  });
  if (!userResult) {
    return res.send({ responseCode: 404, responseMessage: "User not found." });
  }

  if (!amount) {
    return res
      .status(400)
      .json({ status: "error", message: "Enter the Amount" });
  }
  let user = await Wallet.findOne({ userId: userId });
  if (user) {
    try {
      let totalBalance = user.userBalance - amount;
      await Wallet.findByIdAndUpdate(
        { userId: userId },
        { $set: { userBalance: totalBalance } }
      );
      let doc = new transaction({
        userId: userId,
        amount: amount,
        type: "DEBIT",
        status: "ACTIVE",
      });
      doc.save();
      res.send({
        responseCode: 200,
        responseMessage: "Amount Withdrawl Successfull",
      });
    } catch (error) {
      res.send({ responseCode: 400, responseMessage: "Transaction Failed" });
    }
  } else {
    res.send("Wallet User Not found");
  }
};

exports.creditAmount = async (req, res) => {
  const { amount } = req.body;
  let userId = req.params.userId;
  let userResult = await userModel.findOne({
    userId: userId,
    status: "ACTIVE",
  });
  if (!userResult) {
    return res.send({ responseCode: 404, responseMessage: "User not found." });
  }
  if (!amount) {
    return res
      .status(400)
      .json({ status: "error", message: "Enter the Amount" });
  }

  try {
    let user = await Wallet.findOne({ userId: userId });
    let totalBalance = user.userBalance + amount;
    await Wallet.findByIdAndUpdate(
      { userId: userId },
      { $set: { userBalance: totalBalance } }
    );
    let doc = new transaction({
      userId: userId,
      amount: amount,
      type: "CREBIT",
      status: "ACTIVE",
    });
    doc.save();
    res.send({
      responseCode: 200,
      responseMessage: "Amount Credit Successfull",
    });
  } catch (error) {
    res.send({ responseCode: 400, responseMessage: "Transaction Failed" });
  }
};

exports.userUpdate = async (req, res) => {
  const { name, userName, email, mobileNumber, password, countryCode, age } =
    req.body;
  let userId = req.params.userId;
  let update, query;

  let userResult = await userModel.findOne({ _id: userId, status: "ACTIVE" });
  if (!userResult) {
    return res.send({ responseCode: 404, responseMessage: "User not found." });
  }
  try {
    if (email && !mobileNumber) {
      query = {
        email: email,
        _id: { $ne: userResult._id },
        status: { $in: ["ACTIVE", "BLOCK"] },
      };

      let emailCheck = await userModel.findOne(query);
      if (emailCheck)
        return res.send({
          responseCode: 409,
          responseMessage: "Email already exist.",
        });

      update = await userModel.findByIdAndUpdate(
        { _id: userResult._id },
        req.body
      );
      return res.send({
        responseCode: 200,
        responseMessage: "Updated Successfully",
      });
    } else if (!email && mobileNumber) {
      query = {
        mobileNumber: mobileNumber,
        _id: { $ne: userResult._id },
        status: { $in: ["ACTIVE", "BLOCK"] },
      };

      let mobNumberCheck = await userModel.findOne(query);
      if (mobNumberCheck)
        return res.send({
          responseCode: 409,
          responseMessage: "Mobile Number is alraedy exist.",
        });

      update = await userModel.findByIdAndUpdate(
        { _id: userResult._id },
        req.body
      );
      return res.send({
        responseCode: 200,
        responseMessage: "Updated Successfully",
      });
    } else if (email && mobileNumbe) {
      query = {
        email: email,
        mobileNumber: mobileNumber,
        _id: { $ne: userResult._id },
        status: { $in: ["ACTIVE", "BLOCK"] },
      };
      let foundData = await userModel.findOne(query);
      if (foundData) {
        if (foundData.email === email) {
          return res.send({
            responseCode: 409,
            responseMessage: "Email already exist.",
          });
        } else {
          return res.send({
            responseCode: 409,
            responseMessage: "Mobile already exist.",
          });
        }
      }

      update = await userModel.findByIdAndUpdate(
        { _id: userResult._id },
        req.body
      );
      return res.send({
        responseCode: 200,
        responseMessage: "Updated Successfully",
      });
    } else {
      update = await userModel.findByIdAndUpdate(
        { _id: userResult._id },
        req.body,
        { new: true }
      );
      return res.send({ responseCode: 200, responseMessage: "Updated" });
    }
  } catch (error) {
    return res.send({
      responseCode: 400,
      responseMessage: "Server error! Unable to Update",
    });
  }
};

exports.updateUserStatus = async (req, res) => {
  let userId = req.params.userId;
  const { status } = req.body;
  let userResult = await userModel.findOne({ _id: userId, status: "ACTIVE" });
  if (!userResult) {
    return res.send({ responseCode: 404, responseMessage: "User not found." });
  }
  if (!status) {
    return res.send({
      responseCode: 409,
      message: "Enter the Status ex: BLOCK,DELETE ,HOLD",
    });
  }
  try {
    await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { status: status } }
    );
    return res.send({
      responseCode: 200,
      responseMessage: "Status Updated Successfully",
    });
  } catch (error) {
    return res.send({
      responseCode: 400,
      responseMessage: "Server error! Unable to Update",
    });
  }
};
//check Balance
exports.checkBalance = async (req, res) => {
  let userId = req.params.userId;
  let userResult = await userModel.findOne({ _id: userId, status: "ACTIVE" });
  if (!userResult) {
    return res.send({ responseCode: 404, responseMessage: "User not found." });
  }
  let user = await Wallet.findOne({ userId: userId }).select("userBalance");
  if (!user) {
    return res.send({
      responseCode: 404,
      responseMessage: "User Wallet does not exist.",
    });
  }
  return res.send({
    responseCode: 200,
    responseMessage: "Balance fetched Successfully",
    user,
  });
};
//storing uniswap swap fromEtherium to DAI
exports.uniswapDai = async (req, res) => {
  const { factoryId, pairCount, tokenDai, tokenEth, addressDai, addressEth } =
    req.body;
  let userId = req.params.userId;
  let userResult = await userModel.findOne({ _id: userId, status: "ACTIVE" });
  if (!userResult) {
    return res.send({ responseCode: 404, responseMessage: "User not found." });
  }
  if (factoryId) {
    return res.send({ responseCode: 400, responseMessage: "Enter Factory ID" });
  }
  if (tokenDai) {
    return res.send({ responseCode: 400, responseMessage: "Enter DAI value" });
  }
  if (tokenEth) {
    return res.send({
      responseCode: 400,
      responseMessage: "Enter Etherium  value",
    });
  }
  if (addressDai) {
    return res.send({
      responseCode: 400,
      responseMessage: "Enter DAI Address",
    });
  }
  if (addressEth) {
    return res.send({
      responseCode: 400,
      responseMessage: "Enter Etherium Address",
    });
  }
  try {
    let doc = new uniswapSchema({
      factoryId: factoryId,
      pairCount: pairCount,
      token_Dai: tokenDai,
      token_Eth: tokenEth,
      tokenA_Address: addressDai,
      tokenB_Address: addressEth,
      price: price,
      invertedPrice: invertedPrice,
    });
    doc.save();
    return res.send({
      responseCode: 200,
      responseMessage: "Data Saved successfully!",
    });
  } catch (error) {
    return res.send({
      responseCode: 400,
      responseMessage: "Server error! Unable to Save",
    });
  }
};
