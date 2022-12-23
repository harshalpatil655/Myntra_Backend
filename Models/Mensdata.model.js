const mongoose = require("mongoose");

const MensdataSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtit: { type: String },
    price: { type: Number },
    offpercentage: { type: String },
    image: { type: String },
    category: { type: String },
    brand: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MensdataModel = mongoose.model("mensdata", MensdataSchema);

module.exports = { MensdataModel };
