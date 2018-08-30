// models
const Box = require("../../models/storage/box");
// GET ---------------------------------------------------------
const getSingleBoxWithLocation = boxId => {
  return Box.findById(boxId)
    .populate({
      path: "shelfSpot",
      populate: {
        path: "shelf",
        populate: {
          path: "rack",
          populate: {
            path: "storage"
          }
        }
      }
    })
    .populate("storedItems");
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
  ).populate({
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
  });
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
    { $set: { shelfSpot: null } },
    { new: true }
  );
};

module.exports = {
  getSingleBoxWithLocation,
  linkProductToBox,
  linkProductToBoxPopIds,
  linkShelfSpotToBox,
  unlinkProductFromBox,
  unlinkShelfSpotFromBox
};
