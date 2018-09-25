// Models
const ShelfSpot = require("../../models/storage/shelfSpot");

// Get Shelf / Rack / Storage
const shelfRackStorageQuery = {
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
};

// Stored items for a Product Card
const storedItemsQuery = {
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
};

// LINK -------------------------------------------------------
const linkItemToShelfSpotWithLocation = (shelfSpotId, item, itemId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    {
      $addToSet: {
        storedItems: { kind: item, item: itemId }
      }
    },
    { new: true }
  )
    .populate(shelfRackStorageQuery)
    .populate(storedItemsQuery);
};

// UNLINK ------------------------------------------------------
const unlinkItemFromShelfSpotWithLocation = async (
  shelfSpotId,
  item,
  itemId
) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    { $pull: { storedItems: { [item]: itemId } } },
    { new: true }
  )
    .populate(shelfRackStorageQuery)
    .populate(storedItemsQuery);
};

module.exports = {
  linkItemToShelfSpotWithLocation,
  unlinkItemFromShelfSpotWithLocation
};
