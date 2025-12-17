const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { initSocket } = require("./socket");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/quiz", require("./routes/quiz"));

initSocket(server);

server.listen(5005, () => console.log("Server running on 5005"));
