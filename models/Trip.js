const mongoose = require("mongoose");
const TripSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Trip", TripSchema);
