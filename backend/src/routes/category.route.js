const router = require("express").Router();
const {addCategory, fetchAllCategory, updateCategory, deleteCategory} = require("../controller/category.controller.js");
const jwtVerify = require("../middleware/auth.js");




router.route("/addcategory").post(addCategory)
router.route("/categorylist").get(jwtVerify, fetchAllCategory)
router.route("/editcategory").post(jwtVerify, updateCategory)
router.route("/deletecategory").post(jwtVerify, deleteCategory)

module.exports = router;


