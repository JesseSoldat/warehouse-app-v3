// models
const Product = require("../../models/product");
const Box = require("../../models/storage/box");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
// queries
const {
  linkShelfSpotToProductPopLocIds,
  linkBoxToProductPopLocIds
} = require("../queries/product");
const {
  linkProductToShelfSpot,
  linkProductToShelfSpotPopIds,
  linkBoxToShelfSpotPopIds,
  unlinkProductFromShelfSpot,
  unlinkBoxFromShelfSpot
} = require("../queries/shelfSpot");
const {
  linkProductToBox,
  linkProductToBoxPopIds,
  linkShelfSpotToBox,
  unlinkProductFromBox
} = require("../queries/box");

module.exports = (app, io) => {
  const emit = senderId => {
    io.emit("update", {
      msg: "storing",
      senderId,
      timestamp: Date.now()
    });
  };
  // ------------------------- LINKING ---------------------------------
  // Product -> Shelf Spot -----------------------------
  app.patch("/api/link/productToShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      const [product, shelfSpot] = await Promise.all([
        linkShelfSpotToProductPopLocIds(productId, shelfSpotId),
        linkProductToShelfSpotPopIds(shelfSpotId, productId)
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Product and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { shelfSpot, product });
    } catch (err) {
      console.log("Err: PATCH/link/productToShelfSpot,", err);

      const msg = serverMsg("error", "link", "product to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  // Product -> Box ---------------------------------
  app.patch("/api/link/productToBox", isAuth, async (req, res) => {
    const { productId, boxId } = req.body;

    try {
      const [product, box] = await Promise.all([
        linkBoxToProductPopLocIds(productId, boxId),
        linkProductToBoxPopIds(boxId, productId)
      ]);

      emit(req.user._id);

      const msg = msgObj("Product and Box are now linked.", "blue", "hide-3");

      serverRes(res, 200, msg, { box, product });
    } catch (err) {
      console.log("Err: PATCH/link/productToBox,", err);

      const msg = serverMsg("error", "link", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  // Box -> Shelf Spot ---------------------------------
  app.patch("/api/link/boxToShelfSpot", isAuth, async (req, res) => {
    const { boxId, shelfSpotId } = req.body;

    try {
      const [shelfSpot, box] = await Promise.all([
        linkBoxToShelfSpotPopIds(shelfSpotId, boxId),
        linkShelfSpotToBox(boxId, shelfSpotId)
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Box and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { shelfSpot, box });
    } catch (err) {
      console.log("Err: PATCH/boxToShelfSpot,", err);

      const msg = serverMsg("error", "link", "box to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  //-------------------------------- RELINKING ------------------------------------
  // Product -> Shelf Spot -----------------------------
  app.patch("/api/relink/productToShelfSpot", isAuth, async (req, res) => {
    const { prevLocation, productId, shelfSpotId } = req.body;

    try {
      // create query to remove old storage ref
      const { kind, _id } = prevLocation;

      if (kind === "shelfSpot") {
        const oldShelfSpotId = _id;
        await unlinkProductFromShelfSpot(oldShelfSpotId, productId);
      }
      if (kind === "box") {
        const oldBoxId = _id;
        await unlinkProductFromBox(oldBoxId, productId);
      }

      const [product, shelfSpot] = await Promise.all([
        linkShelfSpotToProductPopLocIds(productId, shelfSpotId),
        linkProductToShelfSpotPopIds(shelfSpotId, productId)
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Product and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { shelfSpot, product });
    } catch (err) {
      console.log("Err: PATCH/relink/productToShelfSpot,", err);

      const msg = serverMsg("error", "relink", "product to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  // Product -> Box ---------------------------------
  app.patch("/api/relink/productToBox", isAuth, async (req, res) => {
    const { prevLocation, productId, boxId } = req.body;

    try {
      // create query to remove old storage ref
      const { kind, _id } = prevLocation;

      if (kind === "shelfSpot") {
        const oldShelfSpotId = _id;
        await unlinkProductFromShelfSpot(oldShelfSpotId, productId);
      }
      if (kind === "box") {
        const oldBoxId = _id;
        await unlinkProductFromBox(oldBoxId, productId);
      }

      const [product, box] = await Promise.all([
        linkBoxToProductPopLocIds(productId, boxId),
        linkProductToBox(boxId, productId)
      ]);

      emit(req.user._id);

      const msg = msgObj("Product and Box are now linked.", "blue", "hide-3");

      serverRes(res, 200, msg, { box, product });
    } catch (err) {
      console.log("Err: PATCH/relink/productToBox,", err);

      const msg = serverMsg("error", "relink", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  // -------------- SCAN TWO UNKOWN ITEMS CHECK FOR OLD REF -----------------------
  // Product -> Shelf Spot ---------------------------------------------
  app.patch("/api/scan/productToShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      // Check if Product has a location ---------------------------------------
      const product = await Product.findById(productId);

      // Remove old location
      if (product && product.productLocation && product.productLocation.kind) {
        const { kind, item } = product.productLocation;
        if (kind === "shelfSpot") {
          await unlinkProductFromShelfSpot(item, productId);
        } else if (kind === "box") {
          await unlinkProductFromBox(item, productId);
        }
      }
      // Link Product to NEW Shelf Spot -------------------------------
      product["productLocation"] = {
        kind: "shelfSpot",
        item: shelfSpotId
      };

      const [updateProduct, shelfSpot] = await Promise.all([
        product.save(),
        linkProductToShelfSpotPopIds(shelfSpotId, productId)
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Product and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, {
        product: updateProduct,
        shelfSpot
      });
    } catch (err) {
      console.log("Err: PATCH/SCAN/productToShelfSpot,", err);

      const msg = serverMsg("error", "scan", "product to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  // Product -> Box -----------------------------------------------------
  app.patch("/api/scan/productToBox", isAuth, async (req, res) => {
    const { productId, boxId } = req.body;

    try {
      // Check if Product has a location ---------------------------------------
      const product = await Product.findById(productId);

      // Remove old location -------------------------------------------------
      if (product && product.productLocation && product.productLocation.kind) {
        const { kind, item } = product.productLocation;

        if (kind === "shelfSpot") {
          await unlinkProductFromShelfSpot(item, productId);
        } else if (kind === "box") {
          await unlinkProductFromBox(item, productId);
        }
      }

      // Link Product to NEW Box -------------------------------
      product["productLocation"] = {
        kind: "box",
        item: boxId
      };

      const [updateProduct, box] = await Promise.all([
        product.save(),
        linkProductToBoxPopIds(boxId, productId)
      ]);

      emit(req.user._id);

      const msg = msgObj("Product and Box are now linked.", "blue", "hide-3");

      serverRes(res, 200, msg, { product: updateProduct, box });
    } catch (err) {
      console.log("Err: PATCH/SCAN/productToBox,", err);

      const msg = serverMsg("error", "scan", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  // Box -> Shelf Spot ----------------------------------------------
  app.patch("/api/scan/boxToShelfSpot", isAuth, async (req, res) => {
    const { shelfSpotId, boxId } = req.body;

    try {
      // Check if Box has a location ---------------------------------------
      const box = await Box.findById(boxId);
      // Remove the old location ------------------------------------------
      if (box && box.shelfSpot) {
        const oldShelfSpotId = box.shelfSpot;
        await unlinkBoxFromShelfSpot(oldShelfSpotId, boxId);
      }
      // Link the Box with the NEW Shelf Spot ----------------------------
      box.shelfSpot = shelfSpotId;

      const [updateBox, shelfSpot] = await Promise.all([
        box.save(),
        linkBoxToShelfSpotPopIds(shelfSpotId, boxId)
      ]);

      emit(req.user._id);

      const msg = msgObj(
        "Box and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { box, shelfSpot });
    } catch (err) {
      console.log("Err: PATCH/SCAN/boxToShelfSpot,", err);

      const msg = serverMsg("error", "scan", "box to shelfSpot");

      serverRes(res, 400, msg, null);
    }
  });
};
