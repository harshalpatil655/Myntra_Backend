require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authetication = (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(500).send("Authetication Error");
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { Authetication };
