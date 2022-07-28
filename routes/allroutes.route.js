const router = require("express").Router();
const userController = require("../controllers/user.controller");
const middleAuth = require("../middleware/verifyUser");

router.post("/user/signup", userController.createUser);
router.post("/user/login", userController.UserLogin);

router.get("/get", userController.getUsers);

//protected routes

router.post("/withdraw-amount/:userId", userController.withdrawAmount);

router.post(
  "/credit-amount/:userId",
  middleAuth.verify,
  userController.creditAmount
);

router.put("/user/update", middleAuth.verify, userController.userUpdate);

router.put(
  "/user/updateuserstatus/:userId",
  middleAuth.verify,
  middleAuth.verifyAdmin,
  userController.updateUserStatus
);

router.get("/check-balance", userController.checkBalance);
router.post("/uniswap_daitoeth", middleAuth.verify, userController.uniswapDai);
module.exports = router;
