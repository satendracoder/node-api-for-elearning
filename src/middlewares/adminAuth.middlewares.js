const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User/user.models");

const adminAccess = asyncHandler(async (req, _, next) => {
  try {
    const user = await User.findById(req.user.id); // Changed to `req.user.id` from the token
    if (!user || user.designation !== "admin") {
      throw new ApiError(401, "Only Admin Access");
    }
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

module.exports = adminAccess;
