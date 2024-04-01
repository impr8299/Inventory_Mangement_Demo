const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser")
const path = require("path");
require("dotenv").config();
let db = require("./src/config/db.js");
const app = express();


db.connectDatabase();

app.use(cors({ origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

const userRouter = require('./src/routes/user.route.js')
const productRouter = require("./src/routes/product.route.js")
const categoryRouter = require("./src/routes/category.route.js")


//routes

app.use("/api/product" , productRouter)
app.use("/api/users" , userRouter)
app.use("/api/category" , categoryRouter)


app.listen(process.env.PORT || 8000, () => {
  console.log("welcome to Backend");
});



module.exports = app;