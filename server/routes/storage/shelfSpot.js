// models
const Shelf = require("../../models/storage/shelf");
const ShelfSpot = require("../../models/storage/shelfSpot");
// utils
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");

module.exports = app => {
  // Get all shelfSpots
  app.get("/api/shelfSpots", async (req, res) => {
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
  app.get("/api/shelfSpots/:shelfSpotId", async (req, res) => {
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
  app.post("/api/shelfSpots/:shelfId", async (req, res) => {
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

      serverRes(res, 200, null, { shelf, shelfSpot });
    } catch (err) {
      console.log("Err: POST/api/shelfSpots/:shelfId", err);

      const msg = serverMsg("error", "save", "shelf spot");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a shelfSpot
  app.patch("/api/shelfSpots/:shelfSpotId", async (req, res) => {
    const { shelfSpotId } = req.params;
    try {
      const shelfSpot = await ShelfSpot.findByIdAndUpdate(
        shelfSpotId,
        mergeObjFields("", req.body),
        { new: true }
      );

      serverRes(res, 200, null, shelfSpot);
    } catch (err) {
      console.log("Err: PATCH/api/shelfSpots/:shelfSpotId", err);

      const msg = serverMsg("error", "update", "shelf spot");
      serverRes(res, 400, msg, null);
    }
  });
  // Delete a shelfSpot
  app.delete("/api/shelfSpots/:shelfSpotId", async (req, res) => {
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

      const msg = msgObj("Shelf Spot deleted.", "green");

      serverRes(res, 200, msg, shelfSpot);
    } catch (err) {
      console.log("Err: DELETE/api/shelfSpots/:shelfSpotId", err);

      const msg = msgObj(errMsg("delete", "shelfSpot"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
