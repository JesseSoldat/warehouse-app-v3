// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
// queries
const {
  unlinkBoxFromShelfSpotWithLocation,
  unlinkProductFromShelfSpotWithLocation
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
  // Unlink Product From ShelfSpot
  app.patch("/api/unlink/productFromShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      const [shelfSpot, product] = await Promise.all([
        unlinkProductFromShelfSpotWithLocation(shelfSpotId, productId),
        removeLocationFromProduct(productId)
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Product and Shelf Spot now unlinked.",
        "blue",
        "hide-3"
      );
      serverRes(res, 200, msg, { shelfSpot, product });
    } catch (err) {
      console.log("ERR: Patch/unlink/productFromShelfSpot", err);

      const msg = serverMsg("error", "unlink", "product from shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  // Unlink Product From Box
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

  // Unlink Box From ShelfSpot
  app.patch("/api/unlink/boxFromShelfSpot", isAuth, async (req, res) => {
    const { boxId, shelfSpotId } = req.body;

    try {
      const [box, shelfSpot] = await Promise.all([
        unlinkShelfSpotFromBox(boxId),
        unlinkBoxFromShelfSpotWithLocation(shelfSpotId, boxId)
      ]);

      emit(req.user._id);

      const msg = msgObj("Box and Shelf Spot now unlinked.", "blue", "hide-3");

      serverRes(res, 200, msg, { box, shelfSpot });
    } catch (err) {
      console.log("ERR: Patch/unlink/boxFromShelfSpot", err);

      const msg = serverMsg("error", "unlink", "box from shelf spot");

      serverRes(res, 400, msg, null);
    }
  });
};
