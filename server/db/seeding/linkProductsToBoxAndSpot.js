const mongoose = require("mongoose");
// models
const Box = require("../../models/storage/box");
const ShelfSpot = require("../../models/storage/shelfSpot");
const Product = require("../../models/product");
// helpers
const randomMinMaxNum = require("./helpers/randomMinMaxNum");

module.exports = linkProductsToBoxAndSpot = async () => {
  try {
    const [boxes, spots, products] = await Promise.all([
      Box.find({}),
      ShelfSpot.find({}),
      Product.find({})
    ]);

    const shelfSpotsArray = spots.map((spot, i) => {
      // get the spots that have a box
      if (spot.storedItems.length !== 0) {
        // console.log(`#${i}`, spot.storedItems);
        return {
          spotId: spot._id,
          box: spot.storedItems[0].item
        };
      }
      return {
        spotId: spot._id,
        box: null
      };
    });

    const shelfCount = shelfSpotsArray.length;

    products.forEach(async (product, i) => {
      const randomSpotIndex = randomMinMaxNum(1, shelfCount - 1);

      const productLocation = shelfSpotsArray[randomSpotIndex];

      const shelfSpotId = productLocation.spotId;

      const boxId = productLocation.box;

      // store product in a box
      if (boxId) {
        await Box.findByIdAndUpdate(
          boxId,
          {
            $addToSet: { storedItems: product._id }
          },
          { new: true }
        );

        product["productLocation"] = {
          kind: "box",
          item: boxId
        };
        await product.save();
      }
      // store product on the shelf spot
      else {
        await ShelfSpot.findByIdAndUpdate(
          shelfSpotId,
          {
            $addToSet: { storedItems: { kind: "product", item: product._id } }
          },
          { new: true }
        );

        product["productLocation"] = {
          kind: "shelfSpot",
          item: shelfSpotId
        };
        await product.save();
      }
      if (i < 4) {
        // console.log(`#${i} Product Location`);
        // console.log(product["productLocation"]);
      }
    });

    console.log("done");
  } catch (error) {}
};
