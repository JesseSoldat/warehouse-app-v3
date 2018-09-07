// models
const Storage = require("../../models/storage/storage");

// GET ----------------------------------------------------------------
const getAllStorages = () => {
  return Storage.find({}, ["_id", "description", "storageLabel"]).populate({
    path: "racks",
    select: ["_id", "rackLabel"],
    populate: { path: "shelves", select: ["_id", "shelfLabel", "shelfSpots"] }
  });
};

const getAllStorageIds = () => {
  return Storage.find({}).populate({
    path: "racks",
    select: ["_id", "rackLabel"],
    populate: {
      path: "shelves",
      select: ["_id", "shelfLabel"],
      populate: {
        path: "shelfSpots",
        select: [
          "_id",
          "shelfSpotLabel",
          "storedItems.kind",
          "storedItems._id"
        ],
        populate: {
          path: "storedItems.item",
          select: ["boxLabel", "_id"]
        }
      }
    }
  });
};
// link ------------------------------------------------------------
const linkRackToStorage = (storageId, rackId) => {
  return Storage.findByIdAndUpdate(
    storageId,
    {
      $addToSet: {
        racks: rackId
      }
    },
    { new: true }
  );
};

module.exports = { getAllStorages, getAllStorageIds, linkRackToStorage };
