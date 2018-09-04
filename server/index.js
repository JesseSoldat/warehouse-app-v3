require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./db/mongoose");

const app = express();

const server = app.listen(process.env.PORT);

const io = require("socket.io")(server);

connectToDb(io);

app.use(bodyParser.json());

require("./routes/user")(app);
require("./routes/admin")(app);
require("./routes/product")(app, io);
require("./routes/customer")(app, io);
require("./routes/producer")(app, io);
require("./routes/storage/storage")(app, io);
require("./routes/storage/rack")(app, io);
require("./routes/storage/shelf")(app, io);
require("./routes/storage/shelfSpot")(app, io);
require("./routes/storage/box")(app, io);
require("./routes/storing/link")(app, io);
require("./routes/storing/unlink")(app, io);
require("./routes/image")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve up production assets (main.js or main.css)
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));
  //express will serve up index.html if it doesn't recognize router
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
} else {
  app.get("*", (req, res) => {
    res.send(`A request was made to ${req.url}`);
  });
}
