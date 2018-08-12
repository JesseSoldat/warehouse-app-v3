// models
const ShelfSpot = require("../../models/storage/shelfSpot");
const Box = require("../../models/storage/box");
const Product = require("../../models/product");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");

module.exports = (app, io) => {
  const emit = senderId => {
    io.emit("update", {
      msg: "storing",
      senderId,
      timestamp: Date.now()
    });
  };

  app.patch("/api/link/productToShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      const [product, shelfSpot] = await Promise.all([
        Product.findByIdAndUpdate(
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
        ),
        ShelfSpot.findByIdAndUpdate(
          shelfSpotId,
          {
            $addToSet: {
              storedItems: {
                kind: "product",
                item: productId
              }
            }
          },
          { new: true }
        )
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Product and Shelf Spot now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { shelfSpot, product });
    } catch (err) {
      console.log("Err: PATCH/productToShelfSpot,", err);

      const msg = serverMsg("error", "link", "product to shelf");

      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/link/productToBox", isAuth, (req, res) => {});

  app.patch("/api/link/boxToShelfSpot", isAuth, (req, res) => {});
};
