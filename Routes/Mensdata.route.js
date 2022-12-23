const { Router } = require("express");
const { MensdataModel } = require("../Models/Mensdata.model");

const MensdataRoute = Router();

MensdataRoute.get("/mensdata", async (req, res) => {
  try {
    let query = req.query;

    let brand = query.brand || [];
    let category = query.category || [];
    let price = query.price || [];
    let low = Number(price[0]);
    let high = Number(price[1]);
    let pageNumber = req.query.page || 1;

    if (category.length > 0 && brand.length > 0 && price.length > 0) {
      const data = await MensdataModel.find({
        $and: [
          { price: { $gte: price[0] } },
          { price: { $lte: price[1] } },
          { brand: { $in: [...brand] } },
          { category: { $in: [...category] } },
        ],
      })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);
      res.send(data);
    } else if (price.length > 0 && brand.length > 0) {
      let data = await MensdataModel.find({
        $and: [
          { price: { $gte: price[0] } },
          { price: { $lte: price[1] } },
          { brand: { $in: [...brand] } },
        ],
      })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);

      res.send(data);
    } else if (brand.length > 0 && category.length > 0) {
      //bc
      let data = await MensdataModel.find({
        $and: [
          { brand: { $in: [...brand] } },
          { category: { $in: [...category] } },
        ],
      })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);
      res.send(data);
    } else if (price.length > 0 && category.length > 0) {
      //pc
      let data = await MensdataModel.find({
        $and: [
          { price: { $gte: price[0] } },
          { price: { $lte: price[1] } },
          { category: { $in: [...category] } },
        ],
      })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);
      res.send(data);
    } else if (brand.length > 0 && price.length > 0) {
      //bp
      let data = await MensdataModel.find({
        brand: { $in: [...brand] },
        price: { $gte: price[0] },
        price: { $lte: price[1] },
      })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);

      res.send(data);
    } else if (price.length > 0) {
      //p
      let data = await MensdataModel.find({
        $and: [{ price: { $gte: price[0] } }, { price: { $lte: price[1] } }],
      })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);
      res.send(data);
    } else if (brand.length > 0) {
      //b
      let data = await MensdataModel.find({ brand: { $in: [...brand] } })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);
      res.send(data);
    } else if (category.length > 0) {
      //c
      let data = await MensdataModel.find({ category: { $in: [...category] } })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);
      res.send(data);
    } else {
      const data = await MensdataModel.find()
        .skip(pageNumber > 0 ? (pageNumber - 1) * 6 : 0)
        .limit(6);
      res.send(data);
    }
  } catch (err) {
    res.send("data failed to get");
  }
});

MensdataRoute.post("/menspost", async (req, res) => {
  try {
    const data = new MensdataModel({
      title: req.body.title,
      subtit: req.body.subtit,
      price: req.body.price,
      offpercentage: req.body.offpercentage,
      image: req.body.image,
      category: req.body.category,
      brand: req.body.brand,
    });
    await data.save();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

module.exports = { MensdataRoute };
