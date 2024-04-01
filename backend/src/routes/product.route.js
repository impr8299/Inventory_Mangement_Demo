const router = require("express").Router();
const {addProduct, fetchAllProduct, updateProduct, deleteProduct, viewProduct} = require("../controller/product.controller.js");
const jwtVerify = require("../middleware/auth.js");
const multer = require('multer')
const formData = multer().none()



router.route("/addproduct").post(formData, jwtVerify, addProduct)
router.route("/productlist").post(jwtVerify, fetchAllProduct)
router.route("/editproduct").post(jwtVerify, updateProduct)
router.route("/deleteproduct").post(jwtVerify, deleteProduct)
router.route("/viewproduct").post(jwtVerify, viewProduct)

module.exports = router;


