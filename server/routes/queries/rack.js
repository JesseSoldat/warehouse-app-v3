const Rack = require("../../models/storage/rack");

// GET ----------------------------------------------------------------
const getSingleRack = rackId => {
  return Rack.findById(rackId, ["_id", "rackLabel"])
    .populate({
      path: "shelves",
      select: ["_id", "shelfLabel"],
      populate: {
        path: "shelfSpots",
        select: ["_id", "shelfSpotLabel", "storedItems"],
        populate: {
          path: "storedItems.item",
          select: ["_id", "boxLabel", "productName"],
          populate: {
            path: "storedItems",
            select: [
              "_id",
              "productName",
              "productPictures",
              "packagingPictures"
            ]
          }
        }
      }
    })
    .populate({
      path: "storage",
      select: ["_id"]
    });
};

// Edit -------------------------------------------------------------
const editRack = (rackId, updates) =>
  Rack.findByIdAndUpdate(rackId, updates, {
    new: true
  });

// LINK ----------------------------------------------------------------
const linkShelfToRackPopIds = (rackId, shelfId) => {
  return Rack.findByIdAndUpdate(
    rackId,
    { $addToSet: { shelves: shelfId } },
    { new: true }
  )
    .populate({
      path: "shelves",
      populate: {
        path: "shelfSpots",
        populate: {
          path: "storedItems.item ",
          populate: {
            path: "storedItems"
          }
        }
      }
    })
    .populate("storage");
};

module.exports = { getSingleRack, editRack, linkShelfToRackPopIds };
