const socketEmit = (io, senderId, msg) => {
  io.emit("update", {
    msg,
    senderId,
    timestamp: Date.now()
  });
};

module.exports = socketEmit;
