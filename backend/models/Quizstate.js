const mongoose = require("mongoose");

module.exports = mongoose.model("QuizState", new mongoose.Schema({
  currentQuestion: Number,
  isActive: Boolean,
  ended: Boolean
}));
