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
const getAllBoxesWithLocation = (skip, limit, mongoQuery = {}) => {
  return Box.find(mongoQuery, ["_id", "boxLabel"])
    .skip(skip)
    .limit(limit)
    .populate(boxLocationQuery)
    .populate("storedItems");
};

const getBoxWithLocation = boxId => {
  return Box.findById(boxId, ["_id", "boxLabel"])
    .populate(boxLocationQuery)
    .populate("storedItems");
};

// LINK --------------------------------------------------------

const linkShelfSpotToBoxWithLocation = (boxId, itemId) => {
  return Box.findByIdAndUpdate(
    boxId,
    { $set: { shelfSpot: itemId } },
    { new: true }
  )
    .populate(boxLocationQuery)
    .populate("storedItems");
};

const productToBoxWithLocation = async (productId, boxId) => {
  const box = await Box.findById(boxId);
  console.log(box);

  return Box.findByIdAndUpdate(
    boxId,
    {
      $push: { storedItems: productId }
    },
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
  )
    .populate(boxLocationQuery)
    .populate("storedItems");
};

const unlinkShelfSpotFromBox = boxId => {
  return Box.findByIdAndUpdate(
    boxId,
    { $set: { shelfSpot: null } },
    { new: true }
  ).populate("storedItems");
};

module.exports = {
  getAllBoxesWithLocation,
  getBoxWithLocation,
  linkShelfSpotToBoxWithLocation,
  productToBoxWithLocation,
  unlinkProductFromBox,
  unlinkShelfSpotFromBox
};
