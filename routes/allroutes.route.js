const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")


// SignUp API
router.post('/user/signup', userController.createUser);
router.post('/user/login',userController.UserLogin);
//router.get('/user/verify',userController.getData);

module.exports = router;