// models
const Box = require("../../models/storage/box");

// GET ---------------------------------------------------------
// BOXES with and without a LOCATION
const getAllBoxesWithLocations = (skip, limit, mongoQuery = {}) => {
  return Box.find(mongoQuery, ["_id", "boxLabel"])
    .skip(skip)
    .limit(limit)
    .populate({
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
    })
    .populate("storedItems");
};

// NO LOCATION
const getBox = boxId => {
  return Box.findById(boxId, ["_id", "boxLabel"]).populate("storedItems");
};

// LINK --------------------------------------------------------
const linkProductToBox = (boxId, productId) => {
  return Box.findByIdAndUpdate(
    boxId,
    {
      $addToSet: {
        storedItems: productId
      }
    },
    { new: true }
  );
};

const linkProductToBoxPopIds = (boxId, productId) => {
  return Box.findByIdAndUpdate(
    boxId,
    {
      $addToSet: {
        storedItems: productId
      }
    },
    { new: true }
  )
    .populate({
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
    })
    .populate("storedItems");
};

const linkShelfSpotToBox = (boxId, shelfSpotId) => {
  return Box.findByIdAndUpdate(
    boxId,
    {
      $set: { shelfSpot: shelfSpotId }
    },
    { new: true }
  );
};

// UNLINK ------------------------------------------------------
const unlinkProductFromBox = (boxId, productId) => {
  return Box.findByIdAndUpdate(
    boxId,
    {
      $pull: {
        storedItems: productId
      }
    },
    { new: true }
  );
};

const unlinkShelfSpotFromBox = boxId => {
  return Box.findByIdAndUpdate(
    boxId,
    { $set: { shelfSpot: "" } },
    { new: true }
  );
};

// $unset: { productLocation: {} }

module.exports = {
  getAllBoxesWithLocations,
  getBox,
  linkProductToBox,
  linkProductToBoxPopIds,
  linkShelfSpotToBox,
  unlinkProductFromBox,
  unlinkShelfSpotFromBox
};
