// models
const Storage = require("../../models/storage/storage");
const Rack = require("../../models/storage/rack");
const Shelf = require("../../models/storage/shelf");
const ShelfSpot = require("../../models/storage/shelfSpot");
const Box = require("../../models/storage/box");
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
  // Search storages
  app.get(
    "/api/storages/search/:storageType/:searchBy/:searchText",
    async (req, res) => {
      const { storageType, searchBy, searchText } = req.params;
      let result = {};

      try {
        switch (storageType) {
          case "storage":
            result = await Storage.find({
              [searchBy]: new RegExp(searchText, "i")
            });
            break;

          case "rack":
            result = await Rack.find({
              [searchBy]: new RegExp(searchText, "i")
            });
            break;

          case "shelf":
            result = await Shelf.find({
              [searchBy]: new RegExp(searchText, "i")
            });
            break;

          case "shelfSpot":
            result = await ShelfSpot.find({
              [searchBy]: new RegExp(searchText, "i")
            });
            break;

          case "box":
            result = await Box.find({
              [searchBy]: new RegExp(searchText, "i")
            });
            break;

          default:
            throw Error("Wrong type provided");
        }

        serverRes(res, 200, null, result);
      } catch (err) {
        console.log("Err: GET - Query Storage Items", err);

        const msg = msgObj(errMsg("query", "StorageItems"), "red");
        serverRes(res, 400, msg, null);
      }
    }
  );
  // Get all storages
  app.get("/api/storages", async (req, res) => {
    try {
      const storages = await Storage.find({}).populate({
        path: "racks",
        populate: { path: "shelves" }
      });

      serverRes(res, 200, null, storages);
    } catch (err) {
      console.log("ERR: GET/api/storages", err);

      const msg = serverMsg("error", "fetch", "storages");
      serverRes(res, 400, msg, null);
    }
  });
  // Get a single storage by storageId
  app.get("/api/storages/:storageId", async (req, res) => {
    const { storageId } = req.params;

    try {
      const storage = await Storage.findById(storageId).populate({
        path: "racks",
        populate: {
          path: "shelves",
          populate: {
            path: "shelfSpots"
          }
        }
      });

      serverRes(res, 200, null, storage);
    } catch (err) {
      console.log("ERR: GET/api/storage/:storageId", err);

      const msg = serverMsg("error", "fetch", "storage");
      serverRes(res, 400, msg, null);
    }
  });
  // Create new warehouse storage
  app.post("/api/storages", async (req, res) => {
    const storage = new Storage(req.body);
    try {
      await storage.save();

      emit(req.user._id);

      serverRes(res, 200, null, storage);
    } catch (err) {
      console.log("ERR: POST/api/storage", err);

      const msg = serverMsg("error", "save", "storage");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a storage
  app.patch("/api/storages/:storageId", async (req, res) => {
    const { storageId } = req.params;

    try {
      const storage = await Storage.findByIdAndUpdate(
        storageId,
        mergeObjFields("", req.body),
        { new: true }
      );

      emit(req.user._id);

      serverRes(res, 200, null, storage);
    } catch (err) {
      console.log("ERR: PATCH/api/storage/:storageId", err);

      const msg = serverMsg("error", "update", "storage");
      serverRes(res, 400, msg, null);
    }
  });
  // Delete storage
  app.delete("/api/storages/:storageId", async (req, res) => {
    const { storageId } = req.params;
    try {
      const storage = await Storage.findById(storageId);

      if (storage.racks.length !== 0) {
        const msg = msgObj(
          "Delete or relink all racks of this storage first.",
          "red"
        );
        return serverRes(res, 400, msg, rack);
      }

      await storage.remove();

      const msg = msgObj("Storage deleted.", "green");

      emit(req.user._id);

      serverRes(res, 200, msg, storage);
    } catch (err) {
      console.log("Err: DELETE/api/storages/:storageId", err);

      const msg = msgObj(errMsg("delete", "storage"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
