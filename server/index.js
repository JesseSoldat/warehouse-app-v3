require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./db/mongoose");

connectToDb();

const app = express();

const server = app.listen(process.env.PORT);

const io = require("socket.io")(server);

const onConnect = socket => {
  // console.log(socket.id);

  // emit an event to the socket
  // socket.emit("server", "emit event");
  // emit an event to all connected sockets
  // io.emit("broadcast", "broadcast event");
  // socket.broadcast.emit("update", "this is a test broadcast");
  socket.emit("update", { msg: "update", senderId: "1313w54535434" });

  // sending to all clients in 'update' room except sender
  // socket.to("update").emit("This should not reach your");

  socket.on("client", function(data) {
    console.log("client", data);
  });
};

io.on("connect", onConnect);

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
