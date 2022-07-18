const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const middleAuth = require("../middleware/verifyUser");

// SignUp API
router.post("/user/signup", userController.createUser);
router.post("/user/login", userController.UserLogin);
// router.get('/user/verify',userController.getData);


//protected routes
router.post("/withdraw-amount",  userController.withdrawAmount);
router.post("/credit-amount",  userController.creditAmount);

module.exports = router;
