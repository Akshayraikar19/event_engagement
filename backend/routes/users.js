const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/", async (_, res) => {
  res.json(await User.find());
});

router.post("/answer/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  user.answers.push(req.body.answer);
  if (req.body.correct) user.score++;
  await user.save();
  res.json(user);
});

module.exports = router;
