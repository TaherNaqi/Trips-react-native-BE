const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  bio: { String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: { String },
  trips: [{ type: mongoose.Schema.Types.Object, ref: "Trip" }],
});

module.exports = mongoose.model("Profile", ProfileSchema);
