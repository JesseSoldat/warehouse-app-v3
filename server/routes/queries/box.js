// models
const Box = require("../../models/storage/box");

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

// Box with NO LOCATION
const getBox = boxId => {
  return Box.findById(boxId, ["_id", "boxLabel"]).populate("storedItems");
};

// LINK --------------------------------------------------------
const linkItemToBoxPopIds = (boxId, item, itemId) => {
  return Box.findByIdAndUpdate(
    boxId,
    { $set: { [item]: itemId } },
    { new: true }
  )
    .populate(boxLocationQuery)
    .populate("storedItems");
};

// UNLINK ------------------------------------------------------
const unlinkProductFromBox = (boxId, productId) => {
  return Box.findByIdAndUpdate(
    boxId,
    { $pull: { storedItems: productId } },
    { new: true }
  );
};

const unlinkShelfSpotFromBox = boxId => {
  return Box.findByIdAndUpdate(
    boxId,
    { $set: { shelfSpot: null } },
    { new: true }
  );
};

module.exports = {
  getAllBoxesWithLocations,
  getBox,
  linkItemToBoxPopIds,
  unlinkProductFromBox,
  unlinkShelfSpotFromBox
};
