const Rack = require("../../models/storage/rack");

// GET ----------------------------------------------------------------
const getSingleRack = rackId => {
  return Rack.findById(rackId)
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

module.exports = { getSingleRack, linkShelfToRackPopIds };
