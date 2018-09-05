// models
const Box = require("../../models/storage/box");
// utils
const stringParamsToIntegers = require("../../utils/stringParamsToIntegers");

// GET ---------------------------------------------------------
const getBoxesWithLocation = query => {
  const shouldBeIntegers = ["skip", "limit", "page"];
  const { skip, limit, page } = stringParamsToIntegers(query, shouldBeIntegers);

  const { value, searchOption } = query;

  const mongoQuery = {};

  if (searchOption === "boxLabel") {
    mongoQuery[searchOption] = { $regex: new RegExp(value), $options: "i" };
  } else if (searchOption === "orphans") {
    mongoQuery["shelfSpot"] = null;
  }

  return Box.find(mongoQuery)
    .skip(skip)
    .limit(limit)
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
const getBoxWithLocation = boxId => {
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
    { $set: { shelfSpot: "" } },
    { new: true }
  );
};

// $unset: { productLocation: {} }

module.exports = {
  getBoxesWithLocation,
  getBoxWithLocation,
  linkProductToBox,
  linkProductToBoxPopIds,
  linkShelfSpotToBox,
  unlinkProductFromBox,
  unlinkShelfSpotFromBox
};
