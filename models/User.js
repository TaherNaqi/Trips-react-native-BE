const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const UserSchema = Schema({
  username: {
    max: [15, "Username must between 4 & 15 character"],
    min: [4],
    type: String,
    required: true,
    $nin: ["trip"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // match: [
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //   "Minimum eight characters, at least one letter and one number",
    // ],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

module.exports = model("User", UserSchema);
