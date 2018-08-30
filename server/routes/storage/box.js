// models
const Box = require("../../models/storage/box");
const ShelfSpot = require("../../models/storage/shelfSpot");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { msgObj, serverRes } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");
// queries
const { getSingleBoxWithLocation } = require("../queries/box");
const {
  linkBoxToShelfSpot,
  unlinkBoxFromShelfSpot
} = require("../queries/shelfSpot");

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
      const box = await getSingleBoxWithLocation(boxId);

      serverRes(res, 200, null, box);
    } catch (err) {
      console.log("Err: GET/SINGLE BOX", err);

      const msg = serverMsg("error", "fetch", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // POST BOX with no location
  app.post("/api/boxes", isAuth, async (req, res) => {
    const box = new Box(req.body);

    try {
      await box.save();

      emit(req.user._id);

      const msg = msgObj("Box created.", "blue", "hide-3");

      serverRes(res, 200, msg, box);
    } catch (err) {
      console.log("ERR: POST/BOX", err);

      const msg = serverMsg("error", "post", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // POST BOX with location
  app.post("/api/boxes/:shelfSpotId", isAuth, async (req, res) => {
    const { shelfSpotId } = req.params;
    const box = new Box(req.body);
    try {
      await Promise.all([box.save(), linkBoxToShelfSpot(shelfSpotId, box._id)]);

      emit(req.user._id);

      const msg = msgObj("Box created.", "blue", "hide-3");
      serverRes(res, 200, msg, box);
    } catch (err) {
      console.log("ERR: POST/BOX", err);

      const msg = serverMsg("error", "post", "box");
      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    const update = req.body;

    try {
      await Box.findByIdAndUpdate(boxId, mergeObjFields("", req.body), {
        new: true
      });

      emit(req.user._id);

      const msg = msgObj("Box updated.", "blue", "hide-3");
      serverRes(res, 200, msg, { ...update, boxId });
    } catch (err) {
      console.log("ERR: PATCH/BOX", err);

      const msg = serverMsg("error", "update", "box");
      serverRes(res, 400, msg, null);
    }
  });

  app.delete("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    try {
      const box = await Box.findById(boxId);

      // check for stored items
      if (box["storedItems"].length !== 0) {
        const msg = msgObj(
          "Delete or relink all products of this box first.",
          "red",
          "hide-3"
        );
        serverRes(res, 400, msg, box);
      }
      // no stored items
      else {
        // check if the box is stored on a shelf spot
        const shelfSpotId = box["shelfSpot"];
        if (shelfSpotId) {
          await unlinkBoxFromShelfSpot(shelfSpotId, boxId);
        }
        // delete the box
        box.remove();

        const msg = msgObj("Box deleted", "blue", "hide-3");

        serverRes(res, 200, msg, { boxId: box._id });
      }
    } catch (err) {
      console.log("ERR: Delet/box", err);

      const msg = serverMsg("error", "delete", "boxes");
      serverRes(res, 400, msg, null);
    }
  });
};
