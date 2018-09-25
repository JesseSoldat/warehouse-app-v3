// models
const Shelf = require("../../models/storage/shelf");
const ShelfSpot = require("../../models/storage/shelfSpot");
// middleware
const isAuth = require("../../middleware/isAuth");
// helpers
const storageCheckForStoredItems = require("../helpers/storageCheckForStoredItems");
const socketEmit = require("../helpers/socketEmit");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
// queries
const { getSingleRack } = require("../queries/rack");

module.exports = (app, io) => {
  // Create a new shelfSpot and link it to its shelf
  app.post("/api/shelfSpots/:shelfId", isAuth, async (req, res) => {
    const { shelfId } = req.params;
    const newShelfSpot = new ShelfSpot(req.body);
    newShelfSpot["shelf"] = shelfId;

    try {
      const [shelfSpot, shelf] = await Promise.all([
        newShelfSpot.save(),
        Shelf.findByIdAndUpdate(
          shelfId,
          {
            $addToSet: { shelfSpots: newShelfSpot._id }
          },
          { new: true, upsert: true }
        )
      ]);

      const rackId = shelf.rack;

      const rack = await getSingleRack(rackId);

      const msg = msgObj("The shelf spot was created.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { rack, shelfSpot: { _id: shelfSpot._id } });
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
      await ShelfSpot.findByIdAndUpdate(shelfSpotId, update, { new: true });

      const msg = msgObj("The shelf spot was updated.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

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

      // check for stored items
      if (shelfSpot.storedItems.length !== 0) {
        const msg = storageCheckForStoredItems("shelf-spot");
        return serverRes(res, 400, msg, spot);
      }
      // no items stored
      const shelfId = shelfSpot.shelf;

      await Promise.all([
        Shelf.findByIdAndUpdate(shelfId, {
          $pull: { shelfSpots: shelfSpotId }
        }),
        shelfSpot.remove()
      ]);

      const msg = msgObj("Shelf Spot deleted.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { shelfId, shelfSpotId: shelfSpot._id });
    } catch (err) {
      console.log("Err: DELETE/api/shelfSpots/:shelfSpotId", err);

      const msg = serverMsg("error", "delete", "shelf spot");
      serverRes(res, 400, msg, null);
    }
  });
};
