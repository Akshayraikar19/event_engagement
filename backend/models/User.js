const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  answers: [Number],
  score: { type: Number, default: 0 }
}));
