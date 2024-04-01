const router = require("express").Router();
const jwtVerify = require("../middleware/auth.js");
const multer = require('multer')
const formData = multer().none()
const {
  loginHandler,
  registerUser,
  generateNewRefreshToken,
  logoutHandler,
} = require("../controller/auth.controller.js");


router.route("/register").post(formData, registerUser);
router.route("/login").post(formData, loginHandler);
router.route("/logout").post(jwtVerify, logoutHandler);
router.route("/refresh-token").post(generateNewRefreshToken);
router.route("/logout").post(jwtVerify, logoutHandler);


module.exports = router;
