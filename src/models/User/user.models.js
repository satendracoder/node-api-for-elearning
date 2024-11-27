const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Create Schema for User Detailes
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [false, "username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "Full is required"],
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://satendra.ssbrinet.com/assets/images/homepage/ssbrinet.jpg",
    },
    coverImage: {
      type: String,
      default:
        "https://satendra.ssbrinet.com/assets/images/homepage/ssbrinet.jpg",
    },
    postHistory:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
  },
    designation: {
      type: String,
      default: "user",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Create Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//Create Generate refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// exports cmd
module.exports = mongoose.model("User", userSchema);
