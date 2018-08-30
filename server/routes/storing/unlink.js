// models
const ShelfSpot = require("../../models/storage/shelfSpot");
const Box = require("../../models/storage/box");
const Product = require("../../models/product");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
// queries
const {
  unlinkProductFromShelfSpot,
  unlinkBoxFromShelfSpot
} = require("../queries/shelfSpot");
const { removeLocationFromProduct } = require("../queries/product");
const {
  unlinkProductFromBox,
  unlinkShelfSpotFromBox
} = require("../queries/box");

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
        unlinkProductFromShelfSpot(shelfSpotId, productId),
        removeLocationFromProduct(productId)
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
        unlinkProductFromBox(boxId, productId),
        removeLocationFromProduct(productId)
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

  app.patch("/api/unlink/boxFromShelfSpot", isAuth, async (req, res) => {
    const { boxId, shelfSpotId } = req.body;
    try {
      const [box, shelfSpot] = await Promise.all([
        unlinkShelfSpotFromBox(boxId),
        unlinkBoxFromShelfSpot(shelfSpotId, boxId)
      ]);

      emit(req.user._id);

      const msg = msgObj("Box and Shelf Spot now unlinked.", "blue", "hide-3");

      serverRes(res, 200, msg, { box });
    } catch (err) {
      console.log("ERR: Patch/unlink/boxFromShelfSpot", err);

      const msg = serverMsg("error", "unlink", "box from shelf spot");

      serverRes(res, 400, msg, null);
    }
  });
};
