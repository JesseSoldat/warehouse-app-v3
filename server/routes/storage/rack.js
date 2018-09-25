// models
const Storage = require("../../models/storage/storage");
const Rack = require("../../models/storage/rack");
// middleware
const isAuth = require("../../middleware/isAuth");
// helpers
const socketEmit = require("../helpers/socketEmit");
const storageCheckForStoredItems = require("../helpers/storageCheckForStoredItems");
// utils
const { msgObj, serverRes } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
// queries
const { getSingleRack, editRack } = require("../queries/rack");
const { linkRackToStorage } = require("../queries/storage");

module.exports = (app, io) => {
  // Get a single rack
  app.get("/api/racks/:rackId", isAuth, async (req, res) => {
    const { rackId } = req.params;

    try {
      const rack = await getSingleRack(rackId);

      serverRes(res, 200, null, rack);
    } catch (err) {
      console.log("Err: GET Rack", err);

      const msg = serverMsg("error", "fetch", "rack");
      serverRes(res, 400, msg, null);
    }
  });
  // Create new rack inside storage and link the rack to storage
  app.post("/api/racks/:storageId", isAuth, async (req, res) => {
    const { storageId } = req.params;
    const newRack = new Rack(req.body);

    newRack["storage"] = storageId;

    try {
      await newRack.save();

      const [rack, storage] = await Promise.all([
        getSingleRack(newRack._id),
        linkRackToStorage(storageId, newRack._id)
      ]);

      const msg = msgObj("The rack was saved.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { rack });
    } catch (err) {
      console.log("Err: POST/api/rack/:storageId", err);

      const msg = serverMsg("error", "save", "rack", "create error");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a rack
  app.patch("/api/racks/:rackId", isAuth, async (req, res) => {
    const { rackId } = req.params;
    const updates = req.body;

    try {
      await editRack(rackId, updates);

      const msg = msgObj("The rack was updated.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, updates);
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
        const msg = storageCheckForStoredItems("rack");
        return serverRes(res, 400, msg, null);
      }

      const storageId = rack.storage;

      await Promise.all([
        Storage.findByIdAndUpdate(storageId, {
          $pull: { racks: rackId }
        }),
        rack.remove()
      ]);

      socketEmit(io, req.user._id, "storage");

      const msg = msgObj("Rack deleted.", "blue", "hide-3");

      serverRes(res, 200, msg, { storageId, rackId: rack._id });
    } catch (err) {
      console.log("Err: Delete/api/racks/:rackId", err);

      const msg = serverMsg("error", "delete", "rack", "delete error");
      serverRes(res, 400, msg, null);
    }
  });
};
