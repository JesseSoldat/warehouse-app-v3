// models
const Storage = require("../../models/storage/storage");
const Rack = require("../../models/storage/rack");
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
  // Get all of the racks
  app.get("/api/racks", isAuth, async (req, res) => {
    try {
      const racks = await Rack.find({}).populate("shelves");

      serverRes(res, 200, null, racks);
    } catch (err) {
      console.log("Err: GET/api/rack", err);

      const msg = serverMsg("error", "fetch", "racks");
      serverRes(res, 400, msg, null);
    }
  });
  // Get a single rack
  app.get("/api/racks/:rackId", isAuth, async (req, res) => {
    const { rackId } = req.params;

    try {
      const rack = await Rack.findById(rackId)
        .populate({
          path: "shelves",
          populate: {
            path: "shelfSpots",
            populate: { path: "storedItems.item " }
          }
        })
        .populate("storage");

      serverRes(res, 200, null, rack);
    } catch (err) {
      console.log("Err: GET/api/rack/:rackId", err);

      const msg = serverMsg("error", "fetch", "rack");
      serverRes(res, 400, msg, null);
    }
  });
  // Create new rack inside storage and link the rack to storage
  app.post("/api/racks/:storageId", isAuth, async (req, res) => {
    const { storageId } = req.params;
    const rack = new Rack(req.body);

    rack["storage"] = storageId;

    try {
      await rack.save();

      const storage = await Storage.findByIdAndUpdate(
        storageId,
        {
          $addToSet: {
            racks: rack._id
          }
        },
        { new: true }
      );

      const msg = msgObj("The rack was saved.", "blue", "create");

      emit(req.user._id);

      serverRes(res, 200, msg, { storage, rack });
    } catch (err) {
      console.log("Err: POST/api/rack/:storageId", err);

      const msg = serverMsg("error", "save", "rack", "create error");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a rack
  app.patch("/api/racks/:rackId", isAuth, async (req, res) => {
    const { rackId } = req.params;
    const update = req.body;
    try {
      const rack = await Rack.findByIdAndUpdate(
        rackId,
        mergeObjFields("", update),
        { new: true }
      );

      const msg = msgObj("The rack was updated.", "blue", "update");

      emit(req.user._id);

      serverRes(res, 200, msg, update);
    } catch (err) {
      console.log("Err: PATCH/api/rack/:rackId", err);

      const msg = serverMsg("error", "update", "rack", "update error");
      serverRes(res, 400, msg, null);
    }
  });
  // delete a rack
  app.delete("/api/racks/:rackId", isAuth, async (req, res) => {
    const { rackId } = req.params;
    try {
      const rack = await Rack.findById(rackId);

      if (rack.shelves.length !== 0) {
        const msg = msgObj(
          "Delete or relink all shelves of this rack first.",
          "red"
        );
        return serverRes(res, 400, msg, rack);
      }

      const storageId = rack.storage;

      await Promise.all([
        Storage.findByIdAndUpdate(storageId, {
          $pull: { racks: rackId }
        }),
        rack.remove()
      ]);

      const msg = msgObj("Rack deleted.", "blue");

      emit(req.user._id);

      serverRes(res, 200, msg, rack);
    } catch (err) {
      console.log("Err: DELETE/api/racks/:rackId", err);

      const msg = msgObj(errMsg("delete", "rack"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
