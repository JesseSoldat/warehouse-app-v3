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
        )
          .populate("producer customer")
          .populate({
            path: "productLocation.item",
            populate: {
              path: "shelf shelfSpot",
              populate: {
                path: "shelf rack",
                populate: {
                  path: "rack storage",
                  populate: { path: "storage" }
                }
              }
            }
          }),
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
        "Product and Shelf Spot are now linked.",
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

  app.patch("/api/link/productToBox", isAuth, async (req, res) => {
    const { productId, boxId } = req.body;

    try {
      const [product, box] = await Promise.all([
        Product.findByIdAndUpdate(
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
            populate: {
              path: "shelf shelfSpot",
              populate: {
                path: "shelf rack",
                populate: {
                  path: "rack storage",
                  populate: { path: "storage" }
                }
              }
            }
          }),
        Box.findByIdAndUpdate(
          boxId,
          {
            $addToSet: {
              storedItems: productId
            }
          },
          { new: true }
        )
      ]);

      emit(req.user._id);

      const msg = msgObj("Product and Box are now linked.", "blue", "hide-3");

      serverRes(res, 200, msg, { box, product });
    } catch (err) {
      console.log("Err: PATCH/productToBox,", err);

      const msg = serverMsg("error", "link", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/link/boxToShelfSpot", isAuth, (req, res) => {});
};
