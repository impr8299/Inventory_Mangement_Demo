const asyncHandler = require("../utils/handlerAsync.js");
const User = require("../model/user.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/apiResponse.js");
const { errorResponse } = require("../utils/errorResponse.js");



const generateAccessAndRefereshTokens = async (userId) => {
    try {
      const LoginedUser = await User.findById(userId);
  
      const accessToken = LoginedUser.generateAccessToken();
      const refreshToken = LoginedUser.generateRefreshToken();
      console.log(accessToken, "accessToken");
      LoginedUser.refreshToken = refreshToken;
      await LoginedUser.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating referesh and access token"
      );
    }
  };
  
  const registerUser = asyncHandler(async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      if (
        [fullName, email, password].some((field) => field?.trim() === "")
      ) {
        throw new ApiError(400, "All fields are required");
      }
    
      const existedUser = await User.findOne({
        email: email
      });
    
      if (existedUser) {
        throw new ApiError(409, "email already exists");
      }
  
      const users = await User.create({
        fullName,
        email,
        password,
      });
    
      const createdUser = await User.findById(users._id).select(
        "-password -refreshToken"
      );
    
      if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
      }
    
      return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User registered Successfully"));
    } catch (error) {
      errorResponse({ res, ...error });

    }
  });
  
  
  const loginHandler = asyncHandler(async (req, res) => {
  console.log(req.body, "BODY===>>>>")
    try {
      const { email, password } = req.body;
  
      if (!email) {
        throw new ApiError(400, "email is required");
      }
  
      const user = await User.findOne({
        email:email
      });
  
      if (!user) {
        throw new ApiError(404, "User does not exist");
      }
  
      const isPasswordValid = await user.isPasswordCorrect(password);
  
      if (!isPasswordValid) {
        throw new ApiError(401, "email or password is incorrect");
      }
  
      const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
        user._id
      );
  
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
  
      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: loggedInUser,
              accessToken,
              refreshToken,
            },
            "User logged In Successfully"
          )
        );
    } catch (error) {
      console.log("error: ", error);
      errorResponse({ res, ...error });
    }
  });
  
  const logoutHandler = asyncHandler(async (req, res) => {
    console.log(req, 126);
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logout successfully"));
  });
  
  const generateNewRefreshToken = asyncHandler(async (req, res) => {
    console.log(req, 203);
    const IncomingrefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;
  
    if (!IncomingrefreshToken) {
      throw new ApiError(403, "Unauthorized request");
    }
  
    const decodedtoken = jwt.verify(
      IncomingrefreshToken,
      process.env.REFRESH_TOKEN
    );
  
    console.log(decodedtoken, "decodedtoken");
  });



  module.exports = {
    generateNewRefreshToken,
    logoutHandler,
    loginHandler,
    registerUser,   
  };