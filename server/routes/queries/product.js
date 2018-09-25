const Product = require("../../models/product");

// Gets Box or ShelfSpot Location
// { kind: string, item: {}}
const productQuery = {
  path: "productLocation.item",
  select: ["_id"],
  populate: {
    path: "shelf shelfSpot",
    select: ["_id"],
    populate: {
      path: "shelf rack",
      select: ["_id"],
      populate: {
        path: "rack storage",
        select: ["_id"],
        populate: { path: "storage", select: ["_id"] }
      }
    }
  }
};

// LINK --------------------------------------------------------------
const linkItemToProductWithLocation = (productId, item, itemId) => {
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
    .populate(productQuery);
};

// UNLINK ----------------------------------------------------------------
const removeLocationFromProduct = productId => {
  return Product.findByIdAndUpdate(
    productId,
    { $set: { productLocation: {} } },
    { new: true }
  );
};

module.exports = {
  linkItemToProductWithLocation,
  removeLocationFromProduct
};
