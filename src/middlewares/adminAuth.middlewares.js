const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/Posts_with_Auth/user.models");

const adminAccess = asyncHandler(async (req, _, next) => {
    try {
      const user = await User.findById(req.body.id);
      if(user.designation !== "admin"){
        throw new ApiError(401, error?.message || "Only Admin Access")
      }
      else{
        next();
      }

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})

module.exports = adminAccess;