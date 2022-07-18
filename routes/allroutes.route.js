const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")


// SignUp API
router.post('/user/signup', userController.createUser);
router.post('/user/login',userController.UserLogin);

module.exports = router;