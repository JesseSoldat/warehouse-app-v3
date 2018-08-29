const Product = require("../../models/product");

const addProductToShelfSpotPopLocIds = (productId, shelfSpotId) => {
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

module.exports = { addProductToShelfSpotPopLocIds };
