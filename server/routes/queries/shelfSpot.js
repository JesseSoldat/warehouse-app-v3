// models
const ShelfSpot = require("../../models/storage/shelfSpot");

// LINK -------------------------------------------------------
const linkItemToShelfSpotPopIds = (shelfSpotId, item, itemId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    {
      $addToSet: {
        storedItems: { kind: item, item: itemId }
      }
    },
    { new: true }
  )
    .populate({
      path: "shelf",
      select: ["_id", "shelfLabel"],
      populate: {
        path: "rack",
        select: ["_id", "rackLabel"],
        populate: {
          path: "storage",
          select: ["_id", "storageLabel", "description"]
        }
      }
    })
    .populate({
      path: "storedItems.item",
      select: ["_id", "boxLabel", "productName"],
      populate: {
        path: "storedItems",
        select: [
          "_id",
          "boxLabel",
          "productName",
          "productPictures",
          "packagingPictures"
        ]
      }
    });
};

// UNLINK ------------------------------------------------------
const unlinkProductFromShelfSpot = (shelfSpotId, productId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    {
      $pull: {
        storedItems: { item: productId }
      }
    },
    { new: true }
  );
};

const unlinkBoxFromShelfSpot = (shelfSpotId, boxId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    { $pull: { storedItems: { item: boxId } } },
    { new: true }
  );
};

module.exports = {
  linkItemToShelfSpotPopIds,
  unlinkProductFromShelfSpot,
  unlinkBoxFromShelfSpot
};
