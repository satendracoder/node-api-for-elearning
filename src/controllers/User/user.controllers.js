const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const User = require("../../models/User/user.models.js");
const uploadOnCloudinary = require("../../utils/cloudunary.js");
const ApiResponse = require("../../utils/ApiResponse.js");

const generateAccessAndRefreshToken = async (userId) => {
  try {
      const user = await User.findById(userId);
       if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Sometimg went wrong generating  refresh and access token"
    );
  }
};

//User Register Controller
const registerUser = asyncHandler(async (req, res) => {
  //Get user details from frontend
  //validation - not empty
  //check if user already exists
  //check for images , check for avatar
  //upload them to cloudinary
  //create user objects -- create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullName, email, password, phone } = req.body;
  console.log("email:", email);

  if (
    [fullName, email, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existsUser = await User.findOne({
    $or: [{ phone }, { email }],
  });

  if (existsUser) {
    throw new ApiError(409, "User with email or phone already exists");
  }

  // //files handling
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // let coverImageLocalPath;
  // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
  //     coverImageLocalPath = req.files.coverImage[0].path
  // }

  // if (!avatarLocalPath) {
  //     throw new ApiError(400, "Avatar file is required")
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath)
  // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // if (!avatar) {
  //     throw new ApiError(400, "Avatar file is required")
  // }

  const user = await User.create({
    fullName,
    // avatar: avatar.url,
    // coverImage: coverImage?.url || "",
    email,
    password,
    phone,
    // username: username.toLowerCase(),
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createUser) {
    throw new ApiError(500, "Someting went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User registered Successfully"));
});

//Login User Controller
const loginUser = asyncHandler(async (req, res) => {
  //Req body --> Data
  //username or email
  //find the user
  //password check
  //access token and refresh token generate
  //send cookie

  const {fullName, email, phone, password } = req.body;

  if (!phone && !email ) {
    throw new ApiError(400, "phone or email is required");
  }

  const user = await User.findOne({
    $or: [{ phone }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
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
});

//Logout Controller
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
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
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    debugger
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

       const { accessToken, newRefreshToken } =
          await generateAccessAndRefereshTokens(user._id);
      
    const options = {
      httpOnly: true,
        secure: true,
      sameSite: "strict",
    };

   

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email} = req.body;

  if (!fullName || !email ) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const resetPasswordWithEmail = asyncHandler(async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message: 'User not found' })
    }
    res.json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//export modules while files
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  resetPasswordWithEmail,
  getCurrentUser,
  updateAccountDetails,
};
