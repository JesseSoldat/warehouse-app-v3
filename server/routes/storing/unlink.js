// models
const ShelfSpot = require("../../models/storage/shelfSpot");
const Box = require("../../models/storage/box");
const Product = require("../../models/product");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");

module.exports = (app, io) => {
  const emit = senderId => {
    io.emit("update", {
      msg: "storing",
      senderId,
      timestamp: Date.now()
    });
  };

  app.patch("/api/unlink/productFromShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      const [shelfSpot, product] = await Promise.all([
        ShelfSpot.findByIdAndUpdate(
          shelfSpotId,
          {
            $pull: { storedItems: { item: productId } }
          },
          { new: true }
        ),
        Product.findByIdAndUpdate(
          productId,
          {
            $unset: { productLocation: {} }
          },
          { new: true }
        )
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Product and Shelf Spot now unlinked.",
        "blue",
        "hide-3"
      );
      serverRes(res, 200, msg, null);
    } catch (err) {
      console.log("ERR: Patch/unlink/productFromShelfSpot", err);

      const msg = serverMsg("error", "unlink", "product from shelf spot");

      serverRes(res, 400, msg, { shelfSpot, product });
    }
  });

  app.patch("/api/unlink/productFromBox", isAuth, async (req, res) => {
    const { productId, boxId } = req.body;
    try {
      const [box, product] = await Promise.all([
        Box.findByIdAndUpdate(
          boxId,
          {
            $pull: { storedItems: productId }
          },
          { new: true }
        ),
        Product.findByIdAndUpdate(
          productId,
          {
            $unset: { productLocation: {} }
          },
          { new: true }
        )
      ]);

      emit(req.user._id);

      const msg = msgObj("Product and Box now unlinked.", "blue", "hide-3");

      serverRes(res, 200, msg, { box, product });
    } catch (err) {
      console.log("ERR: Patch/unlink/productFromBox", err);

      const msg = serverMsg("error", "unlink", "product from box");

      serverRes(res, 400, msg, null);
    }
  });
};
