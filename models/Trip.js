const mongooseSlugPlugin = require("mongoose-slug-plugin");
const mongoose = require("mongoose");
const TripSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    description: String,
    // owner: { type: mongoose.Schema.Types.Object, ref: "User" },
  },
  { timestamps: true }
);
TripSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Trip", TripSchema);
