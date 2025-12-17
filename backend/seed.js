require("dotenv").config();   // ✅ ADD THIS LINE FIRST
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
const Question = require("./models/Question");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  await Admin.create({
    email: "admin@event.com",
    password: await bcrypt.hash("admin123", 10)
  });

  await Question.insertMany([
    { text: "JS is?", options: ["Lang", "DB"], correctIndex: 0 },
    { text: "React uses?", options: ["DOM", "VDOM"], correctIndex: 1 },
    { text: "MongoDB is?", options: ["SQL", "NoSQL"], correctIndex: 1 },
    { text: "HTTP stands for?", options: ["Hyper", "Transfer"], correctIndex: 0 },
    { text: "Node is?", options: ["Runtime", "Browser"], correctIndex: 0 }
  ]);

  console.log("Seeded");
  process.exit();
})();
