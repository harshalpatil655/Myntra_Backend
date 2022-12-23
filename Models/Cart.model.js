const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtit: { type: String },
    price: { type: Number },
    offpercentage: { type: String },
    image: { type: String },
    category: { type: String },
    brand: { type: String },
    userId: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CartModel = mongoose.model("cart", CartSchema);

module.exports = CartModel;
