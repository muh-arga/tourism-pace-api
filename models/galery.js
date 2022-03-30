const mongoose = require("mongoose");
const { Schema } = mongoose;

const galerySchema = new Schema(
  {
    imageAsset: String,
    place_id: String,
  },
  { timestamps: true }
);

const Galery = mongoose.model("Galery", galerySchema);

module.exports = Galery;
