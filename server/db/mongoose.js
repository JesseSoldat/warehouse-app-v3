const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectToDb = io =>
  mongoose
    .connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true }
    )
    .then(() => {
      // console.log("DB connected");
      require("./seed");
    })
    .catch(err => {
      io.emit("update", {
        msg: "database error",
        senderId: "er434534",
        timestamp: Date.now()
      });

      console.log("DB error: ", err);
    });

module.exports = connectToDb;
