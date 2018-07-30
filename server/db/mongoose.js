const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectToDb = () =>
  mongoose
    .connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true }
    )
    .then(() => {
      // console.log("DB connected");
      require("./seed");
    })
    .catch(err => console.log("DB error: ", err));

module.exports = connectToDb;
