const express = require("express");
const router = express.Router();
const UserController = require("./UserController");
const { requirebody, requireLoginBody } = require("./UserValidation");
const validationfun = require("./../../../common/utils/commonValidation");
const { protectRoute } = require("../../../common/utils/utils");

router.post(
  "/register",
  validationfun(requirebody, "body"),
  UserController.registerUser
);

router.post(
  "/login",
  validationfun(requireLoginBody, "body"),
  UserController.loginUser
);
router.get("/logout", protectRoute, UserController.logout);
module.exports = router;
