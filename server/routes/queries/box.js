// models
const Box = require("../../models/storage/box");

// Get the location of a box with only the _ids
const boxLocationQuery = {
  path: "shelfSpot",
  select: ["_id"],
  populate: {
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
  }
};

// Get the minimum data for display a product card in the box details
const boxStoredItemsCardInfo = {
  path: "storedItems",
  select: ["_id", "productName", "productPictures", "packagingPictures"]
};

// --------------------------- Get -------------------------------
// All Boxes with and without Locations
const getAllBoxesWithLocation = (skip, limit, mongoQuery = {}) => {
  return Box.find(mongoQuery, ["_id", "boxLabel"])
    .skip(skip)
    .limit(limit)
    .populate(boxLocationQuery)
    .populate(boxStoredItemsCardInfo);
};

// Single Box with Locations
const getBoxWithLocation = boxId => {
  return Box.findById(boxId, ["_id", "boxLabel"])
    .populate(boxLocationQuery)
    .populate(boxStoredItemsCardInfo);
};

// --------------------------- Edit -------------------------------
const editBox = (boxId, updates) => {
  return Box.findByIdAndUpdate(boxId, updates, {
    new: true
  });
};

// --------------------------- Link -------------------------------
const linkShelfSpotToBoxWithLocation = (boxId, itemId) => {
  return Box.findByIdAndUpdate(
    boxId,
    { $set: { shelfSpot: itemId } },
    { new: true }
  )
    .populate(boxLocationQuery)
    .populate(boxStoredItemsCardInfo);
};

const linkProductToBoxWithLocation = (boxId, productId) => {
  return Box.findByIdAndUpdate(
    boxId,
    {
      $addToSet: { storedItems: productId }
    },
    { new: true }
  )
    .populate(boxLocationQuery)
    .populate(boxStoredItemsCardInfo);
};

// -------------------------- Un-Link -------------------------------
const unlinkProductFromBox = (boxId, productId) => {
  return Box.findByIdAndUpdate(
    boxId,
    { $pull: { storedItems: productId } },
    { new: true }
  )
    .populate(boxLocationQuery)
    .populate(boxStoredItemsCardInfo);
};

const unlinkShelfSpotFromBox = boxId => {
  return Box.findByIdAndUpdate(
    boxId,
    { $set: { shelfSpot: null } },
    { new: true }
  ).populate(boxStoredItemsCardInfo);
};

module.exports = {
  linkProductToBoxWithLocation,
  getAllBoxesWithLocation,
  getBoxWithLocation,
  editBox,
  linkShelfSpotToBoxWithLocation,
  unlinkProductFromBox,
  unlinkShelfSpotFromBox
};
