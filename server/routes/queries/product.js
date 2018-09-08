const Product = require("../../models/product");

// LINK --------------------------------------------------------------
const linkItemToProductPopIds = (productId, item, itemId) => {
  return Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        productLocation: {
          kind: item,
          item: itemId
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
      $set: { productLocation: {} }
    },
    { new: true }
  );
};

module.exports = {
  linkItemToProductPopIds,
  removeLocationFromProduct
};
