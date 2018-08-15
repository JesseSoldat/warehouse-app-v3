// models
const Box = require("../../models/storage/box");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { msgObj, serverRes } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");

module.exports = (app, io) => {
  const emit = senderId => {
    io.emit("update", {
      msg: "storage",
      senderId,
      timestamp: Date.now()
    });
  };

  app.get("/api/boxes", isAuth, async (req, res) => {
    try {
      const boxes = await Box.find({});

      serverRes(res, 200, null, boxes);
    } catch (err) {
      console.log("Err: GET/BOXES", err);

      const msg = serverMsg("error", "fetch", "boxes");
      serverRes(res, 400, msg, null);
    }
  });

  app.get("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    try {
      const box = await Box.findById(boxId)
        .populate({
          path: "shelfSpot",
          populate: {
            path: "shelf",
            populate: {
              path: "rack",
              populate: "storage"
            }
          }
        })
        .populate("storedItems");

      serverRes(res, 200, null, box);
    } catch (err) {
      console.log("Err: GET/SINGLE BOX", err);

      const msg = serverMsg("error", "fetch", "box");
      serverRes(res, 400, msg, null);
    }
  });

  app.post("/api/boxes", isAuth, async (req, res) => {
    const box = new Box(req.body);
    try {
      await box.save();

      emit(req.user._id);

      const msg = msgObj("Box created.", "blue", "hide-3");
      serverRes(res, 200, msg, box);
    } catch (err) {
      console.log("ERR: POST/BOX", err);

      const msg = serverMsg("error", "post", "boxes");
      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/boxes/:boxId", isAuth, (req, res) => {});

  app.delete("/api/boxes/:boxId", isAuth, (req, res) => {});
};
