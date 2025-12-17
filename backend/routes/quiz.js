const router = require("express").Router();
const User = require("../models/User"); // your attendees
const QuizState = require("../models/Quizstate");

// Get all questions
router.get("/questions", async (_, res) => {
  res.json(await Question.find());
});

// Update quiz state (current question / active)
router.post("/state", async (req, res) => {
  const state = await QuizState.findOneAndUpdate({}, req.body, { upsert: true, new: true });
  res.json(state);
});

router.get("/state", async (_, res) => {
  res.json(await QuizState.findOne());
});

// ✅ End Quiz and calculate winner
router.post("/end", async (req, res) => {
  try {
    const users = await User.find();

    if (!users.length) return res.status(400).json({ message: "No users found" });

    // calculate max score
    const maxScore = Math.max(...users.map(u => u.score));

    // find winner(s)
    const winners = users.filter(u => u.score === maxScore);

    res.json({ users, winner: winners[0] }); // return first winner
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to end quiz" });
  }
});

module.exports = router;
