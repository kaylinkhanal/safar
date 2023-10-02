const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: String,
  password: String,
  avatarImage: String,
  role: {
    type: String,
    enum: ["Rider", "User", "Admin", "Guest-User"],
    default: "Admin",
  },
  licenseDetails: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
