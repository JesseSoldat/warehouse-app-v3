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
require("./routes/product")(app, io);
require("./routes/customer")(app, io);
require("./routes/producer")(app, io);
require("./routes/storage/storage")(app, io);
require("./routes/storage/rack")(app, io);
require("./routes/storage/shelf")(app, io);
require("./routes/storage/shelfSpot")(app, io);

app.get("*", (req, res) => {
  console.log(req.url);

  res.send("server running");
});
