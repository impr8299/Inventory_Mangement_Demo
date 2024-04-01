const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {BCRYPT} = require("../config/constants.js")

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,           
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },    
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save",  async function (next) {

    if(!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password , BCRYPT.SALT )
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
    console.log("first")
   const accessToken =  jwt.sign({
        id : this._id,
        fullName:this.fullName
    },


process.env.ACCESS_TOKEN,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
    )

    return accessToken
} 
         
userSchema.methods.generateRefreshToken = function() {
   const refreshToken =  jwt.sign({
        id : this._id,
        
    },
process.env.REFRESH_TOKEN,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
    )

    return refreshToken
}

const User = mongoose.model("User", userSchema)

module.exports = User