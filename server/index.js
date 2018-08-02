require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./db/mongoose");

connectToDb();

const app = express();

const server = app.listen(process.env.PORT);

const io = require("socket.io")(server);

app.use(bodyParser.json());

require("./routes/user")(app);
require("./routes/product")(app);
require("./routes/customer")(app, io);
require("./routes/producer")(app);
require("./routes/storage/storage")(app);
require("./routes/storage/rack")(app);
require("./routes/storage/shelf")(app);
require("./routes/storage/shelfSpot")(app);

app.get("*", (req, res) => {
  console.log(req.url);

  res.send("server running");
});
