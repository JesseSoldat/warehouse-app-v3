const Product = require("../../models/product");

// LINK --------------------------------------------------------------
const linkShelfSpotToProductPopLocIds = (productId, shelfSpotId) => {
  return Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        productLocation: {
          kind: "shelfSpot",
          item: shelfSpotId
        }
      }
    },
    { new: true }
  )
    .populate("producer customer")
    .populate({
      path: "productLocation.item",
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

const linkBoxToProductPopLocIds = (productId, boxId) => {
  return Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        productLocation: {
          kind: "box",
          item: boxId
        }
      }
    },
    { new: true }
  )
    .populate("producer customer")
    .populate({
      path: "productLocation.item",
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

// UNLINK ----------------------------------------------------------------
const removeLocationFromProduct = productId => {
  return Product.findByIdAndUpdate(
    productId,
    {
      $unset: { productLocation: "" }
    },
    { new: true }
  );
};

module.exports = {
  linkShelfSpotToProductPopLocIds,
  linkBoxToProductPopLocIds,
  removeLocationFromProduct
};
