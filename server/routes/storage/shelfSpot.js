// models
const Shelf = require("../../models/storage/shelf");
const ShelfSpot = require("../../models/storage/shelfSpot");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
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
  // Get all shelfSpots
  app.get("/api/shelfSpots", isAuth, async (req, res) => {
    try {
      const shelfSpots = await ShelfSpot.find();

      serverRes(res, 200, null, shelfSpots);
    } catch (err) {
      console.log("Err: GET/api/shelfSpots", err);

      const msg = serverMsg("error", "fetch", "shelf spots");
      serverRes(res, 400, msg, null);
    }
  });
  // Get a single shelfSpot
  app.get("/api/shelfSpots/:shelfSpotId", isAuth, async (req, res) => {
    const { shelfSpotId } = req.params;

    try {
      const shelfSpot = await ShelfSpot.findById(shelfSpotId)
        .populate("storedItems.item")
        .populate({
          path: "shelf",
          populate: {
            path: "rack",
            populate: {
              path: "storage"
            }
          }
        });

      serverRes(res, 200, null, shelfSpot);
    } catch (err) {
      console.log("Err: GET/api/shelfSpots/:shelfSpotId", err);

      const msg = serverMsg("error", "fetch", "shelf spot");
      serverRes(res, 400, msg, null);
    }
  });
  // Create a new shelfSpot and link it to its shelf
  app.post("/api/shelfSpots/:shelfId", isAuth, async (req, res) => {
    const { shelfId } = req.params;
    const shelfSpot = new ShelfSpot(req.body);
    shelfSpot["shelf"] = shelfId;

    try {
      await shelfSpot.save();

      const shelf = await Shelf.findByIdAndUpdate(
        shelfId,
        {
          $addToSet: {
            shelfSpots: shelfSpot._id
          }
        },
        { new: true, upsert: true }
      );

      emit(req.user._id);

      const msg = msgObj("The shelf spot was created.", "blue", "hide-3");

      serverRes(res, 200, msg, { shelf, shelfSpot });
    } catch (err) {
      console.log("Err: POST/api/shelfSpots/:shelfId", err);

      const msg = serverMsg("error", "save", "shelf spot");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a shelfSpot
  app.patch("/api/shelfSpots/:shelfSpotId", isAuth, async (req, res) => {
    const { shelfSpotId } = req.params;
    const update = req.body;

    try {
      await ShelfSpot.findByIdAndUpdate(
        shelfSpotId,
        mergeObjFields("", req.body),
        { new: true }
      );

      emit(req.user._id);

      const msg = msgObj("The shelf spot was updated.", "blue", "hide-3");

      serverRes(res, 200, msg, { ...update, shelfSpotId });
    } catch (err) {
      console.log("Err: PATCH/api/shelfSpots/:shelfSpotId", err);

      const msg = serverMsg("error", "update", "shelf spot");
      serverRes(res, 400, msg, null);
    }
  });
  // Delete a shelfSpot
  app.delete("/api/shelfSpots/:shelfSpotId", isAuth, async (req, res) => {
    const { shelfSpotId } = req.params;
    try {
      const shelfSpot = await ShelfSpot.findById(shelfSpotId);

      if (shelfSpot.storedItems.length !== 0) {
        const msg = msgObj(
          "Delete or relink all stored items of this spot first.",
          "red"
        );
        return serverRes(res, 400, msg, spot);
      }

      const shelfId = shelfSpot.shelf;

      await Promise.all([
        Shelf.findByIdAndUpdate(shelfId, {
          $pull: { shelfSpots: shelfSpotId }
        }),
        shelfSpot.remove()
      ]);

      const msg = msgObj("Shelf Spot deleted.", "blue", "hide-3");

      emit(req.user._id);

      serverRes(res, 200, msg, shelfSpot);
    } catch (err) {
      console.log("Err: DELETE/api/shelfSpots/:shelfSpotId", err);

      const msg = msgObj(errMsg("delete", "shelfSpot"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
