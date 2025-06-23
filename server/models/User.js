// server/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String, // URL to the uploaded image
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
