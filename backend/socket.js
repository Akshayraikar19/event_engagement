const socketIo = require("socket.io");
let io;

const initSocket = (server) => {
  io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", socket => {
    socket.on("quiz:update", data => io.emit("quiz:update", data));
    socket.on("scores:update", data => io.emit("scores:update", data));
  });
};

module.exports = { initSocket };
