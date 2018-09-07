// models
const ShelfSpot = require("../../models/storage/shelfSpot");

// LINK -------------------------------------------------------
const linkProductToShelfSpot = (shelfSpotId, productId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    {
      $addToSet: {
        storedItems: {
          kind: "product",
          item: productId
        }
      }
    },
    { new: true }
  );
};

const linkProductToShelfSpotPopIds = (shelfSpotId, productId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    {
      $addToSet: {
        storedItems: { kind: "product", item: productId }
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
      populate: {
        path: "storedItems"
      }
    });
};

const linkBoxToShelfSpot = (shelfSpotId, boxId) => {
  return ShelfSpot.findByIdAndUpdate(
    shelfSpotId,
    {
      $addToSet: { storedItems: { kind: "box", item: boxId } }
    },
    { new: true }
  );
};

const linkBoxToShelfSpotPopIds = (shelfSpotId, boxId) => {
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
  linkProductToShelfSpot,
  linkProductToShelfSpotPopIds,
  linkBoxToShelfSpot,
  linkBoxToShelfSpotPopIds,
  unlinkProductFromShelfSpot,
  unlinkBoxFromShelfSpot
};
