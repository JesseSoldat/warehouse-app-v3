// models
const ShelfSpot = require("../../models/storage/shelfSpot");

const addBoxToShelfSpotPopulateIds = (shelfSpotId, boxId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    { $addToSet: { storedItems: { kind: "box", item: boxId } } },
    { new: true }
  ).populate({
    path: "shelf",
    select: ["_id"],
    populate: {
      path: "rack",
      select: ["_id"],
      populate: {
        path: "storage",
        select: ["_id"]
      }
    }
  });
};

module.exports = { addBoxToShelfSpotPopulateIds };
