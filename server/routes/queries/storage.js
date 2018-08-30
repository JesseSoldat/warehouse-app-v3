// models
const Storage = require("../../models/storage/storage");

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

module.exports = { linkRackToStorage };
