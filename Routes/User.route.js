const { Router } = require("express");
const { SignupModel } = require("../Models/User.model.js");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserRoute = Router();

UserRoute.get("/home", (req, res) => {
  res.send("myntra");
});

UserRoute.post(
  "/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name cannot be empty"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail()
      .toLowerCase(),
    body(`password`)
      .trim()
      .isLength(5)
      .withMessage("Password length is short, min 5 char"),
    body(`confirmpass`).custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).send({ errors: errors.errors[0].msg });
      }
      const { name, email, password, confirmpass } = req.body;
      const doesexist = await SignupModel.findOne({ email });
      if (doesexist) {
        res.status(400).send({ errors: "User Already Exists" });
        return;
      }

      const user = new SignupModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmpass: req.body.confirmpass,
      });

      await user.save();
      res.send({ msg: "Signup Successfull" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: err.message, data: err });
    }
  }
);

UserRoute.post(
  "/login",
  [
    body("email").not().isEmpty().isEmail().withMessage("Email Required"),
    body("password").not().isEmpty().withMessage("Password Required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { email, password } = req.body;

      const user = await SignupModel.findOne({ email });

      if (user) {
        if (user.password == password) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
          res.send({ details: "Login successfull", name: user.name, token });
        } else {
          res.status(400).send({ errors: "wrong password" });
        }
      } else {
        res.status(400).send({ errors: "Wrong Email" });
      }
    } catch (err) {
      return res.status(500).send({ errors: err.message });
    }
  }
);

module.exports = { UserRoute };
