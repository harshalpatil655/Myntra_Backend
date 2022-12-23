const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmpass: { type: String, required: true },
});

const SignupModel = mongoose.model("signup", SignupSchema);

module.exports = { SignupModel };
