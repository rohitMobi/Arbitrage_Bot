const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")


// SignUp API
router.post('/user/signup', userController.createUser);

module.exports = router;