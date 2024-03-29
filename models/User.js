const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please pprovide a username"],
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minlength: 6,
    select: false,
  },
  firstname: {
    type: String,
    maxlength: 20,
    default: "",
  },
  lastname: {
    type: String,
    maxlength: 20,
    default: "",
  },
  location: {
    type: String,
    maxlength: 20,
    default: "",
  },
  country: {
    type: String,
    maxlength: 20,
    default: "",
  },
  language: {
    type: String,
    maxlength: 20,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  aboutme: {
    type: String,
    maxlength: 200,
    default: "",
  },
  overall: {
    played: {
      type: Number,
      default: 0,
    },
    won: {
      type: Number,
      default: 0,
    },
    lost: {
      type: Number,
      default: 0,
    },
  },
  white: {
    played: {
      type: Number,
      default: 0,
    },
    won: {
      type: Number,
      default: 0,
    },
    lost: {
      type: Number,
      default: 0,
    },
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
