const User = require("../model/user.model.js")
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError.js");
const asyncHandler = require("../utils/handlerAsync.js");

const jwtVerify = asyncHandler(async(req, _, next)=>{

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")     
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
   
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
        console.log(decodedToken, "decodedToken")
    
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }




})

module.exports = jwtVerify