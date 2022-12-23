const { Router } = require("express");
const CartModel = require("../Models/Cart.model");

const CartRoute = Router();

CartRoute.get("/", async (req, res) => {
  const { userId } = req.body;

  const cartItems = await CartModel.find({ userId });

  if (cartItems) {
    res.send(cartItems);
  } else {
    res.send("Error in getting Cart Data");
  }
});

CartRoute.post("/cartdata", async (req, res) => {
  try {
    const data = new CartModel({
      title: req.body.title,
      subtit: req.body.subtit,
      price: req.body.price,
      offpercentage: req.body.offpercentage,
      image: req.body.image,
      category: req.body.category,
      brand: req.body.brand,
      userId: req.body.userId,
    });
    await data.save();

    res.send(data);
  } catch (err) {
    res.send(error);
  }
});

CartRoute.delete("/delete/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { userId } = req.body;

    const deleteCart = await CartModel.deleteOne({
      _id,
      userId,
    });

    if (deleteCart.deletedCount > 0) {
      res.status(200).send("deleted Successfully");
    } else {
      res.status(400).send("You have not authorised");
    }
  } catch (err) {
    res.status(500).send("You are not Authorised");
  }
});

module.exports = { CartRoute };
