// models
const Rack = require("../../models/storage/rack");
const Shelf = require("../../models/storage/shelf");
// middleware
const isAuth = require("../../middleware/isAuth");
// helpers
const socketEmit = require("../helpers/socketEmit");
const storageCheckForStoredItems = require("../helpers/storageCheckForStoredItems");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
// queries
const { linkShelfToRackPopIds } = require("../queries/rack");

module.exports = (app, io) => {
  // Create a new shelf inside a rack and link it to the rack
  app.post("/api/shelves/:rackId", isAuth, async (req, res) => {
    let { rackId } = req.params;
    const newShelf = new Shelf(req.body);

    newShelf["rack"] = rackId;

    try {
      const [shelf, rack] = await Promise.all([
        newShelf.save(),
        linkShelfToRackPopIds(rackId, newShelf._id)
      ]);

      const msg = msgObj("The shelf was saved.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { shelf: { _id: shelf._id }, rack });
    } catch (err) {
      console.log("Err: POST/api/shelf/:rackId", err);

      const msg = serverMsg("error", "create", "shelf", "create error");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a shelf
  app.patch("/api/shelves/:shelfId", isAuth, async (req, res) => {
    const { shelfId } = req.params;
    const update = req.body;
    try {
      await Shelf.findByIdAndUpdate(shelfId, update, {
        new: true
      });

      const msg = msgObj("The shelf was updated.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { ...update, shelfId });
    } catch (err) {
      console.log("Err: PATCH/api/shelf/:shelfId", err);

      const msg = serverMsg("error", "update", "shelf", "update error");
      serverRes(res, 400, msg, null);
    }
  });
  // delete a shelf
  app.delete("/api/shelves/:shelfId", isAuth, async (req, res) => {
    const { shelfId } = req.params;
    try {
      let shelf = await Shelf.findById(shelfId);

      // check for shelf spots
      if (shelf.shelfSpots.length !== 0) {
        const msg = storageCheckForStoredItems("shelf");
        return serverRes(res, 400, msg, shelf);
      }

      const rackId = shelf.rack;

      await Promise.all([
        Rack.findByIdAndUpdate(rackId, {
          $pull: { shelves: shelfId }
        }),
        shelf.remove()
      ]);

      const msg = msgObj("Shelf deleted.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { shelfId: shelf._id });
    } catch (err) {
      console.log("Err: DELETE/api/shelves/:shelfId", err);

      const msg = msgObj(errMsg("delete", "shelf"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
