const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")


// Wallets API
router.post('/user/wallet/create', userController.createWallet);

module.exports = router;