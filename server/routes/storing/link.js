// models
const Product = require("../../models/product");
const Box = require("../../models/storage/box");
// middleware
const isAuth = require("../../middleware/isAuth");
// helpers
const socketEmit = require("../helpers/socketEmit");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
// queries
const { linkItemToProductWithLocation } = require("../queries/product");
const {
  linkItemToShelfSpotWithLocation,
  unlinkProductFromShelfSpotWithLocation,
  unlinkBoxFromShelfSpotWithLocation
} = require("../queries/shelfSpot");
const {
  linkProductToBoxWithLocation,
  linkShelfSpotToBoxWithLocation,
  unlinkProductFromBox
} = require("../queries/box");

module.exports = (app, io) => {
  // ------------------------- Linking ------------------------------
  // Product -> Shelf Spot
  app.patch("/api/link/productToShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      const [product, shelfSpot] = await Promise.all([
        linkItemToProductWithLocation(productId, "shelfSpot", shelfSpotId),
        linkItemToShelfSpotWithLocation(shelfSpotId, "product", productId)
      ]);

      const msg = msgObj(
        "Product and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { shelfSpot, product });
    } catch (err) {
      console.log("Err: PATCH/link/productToShelfSpot,", err);

      const msg = serverMsg("error", "link", "product to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  // Product -> Box
  app.patch("/api/link/productToBox", isAuth, async (req, res) => {
    const { productId, boxId } = req.body;

    try {
      const [product, box] = await Promise.all([
        linkItemToProductWithLocation(productId, "box", boxId),
        linkProductToBoxWithLocation(boxId, productId)
      ]);

      const msg = msgObj("Product and Box are now linked.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { box, product });
    } catch (err) {
      console.log("Err: PATCH/link/productToBox,", err);

      const msg = serverMsg("error", "link", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  // Box -> Shelf Spot
  app.patch("/api/link/boxToShelfSpot", isAuth, async (req, res) => {
    const { boxId, shelfSpotId } = req.body;

    try {
      const [shelfSpot, box] = await Promise.all([
        linkItemToShelfSpotWithLocation(shelfSpotId, "box", boxId),
        linkShelfSpotToBoxWithLocation(boxId, shelfSpotId)
      ]);

      const msg = msgObj(
        "Box and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { shelfSpot, box });
    } catch (err) {
      console.log("Err: PATCH/boxToShelfSpot,", err);

      const msg = serverMsg("error", "link", "box to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  //------------------------ Re-Linking --------------------------------
  // Product -> Shelf Spot
  app.patch("/api/relink/productToShelfSpot", isAuth, async (req, res) => {
    const { prevLocation, productId, shelfSpotId } = req.body;

    try {
      // create query to remove old storage ref
      const { kind, _id } = prevLocation;

      if (kind === "shelfSpot") {
        const oldShelfSpotId = _id;
        await unlinkProductFromShelfSpotWithLocation(oldShelfSpotId, productId);
      }
      if (kind === "box") {
        const oldBoxId = _id;
        await unlinkProductFromBox(oldBoxId, productId);
      }

      const [product, shelfSpot] = await Promise.all([
        linkItemToProductWithLocation(productId, "shelfSpot", shelfSpotId),
        linkItemToShelfSpotWithLocation(shelfSpotId, "product", productId)
      ]);

      const msg = msgObj(
        "Product and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { shelfSpot, product });
    } catch (err) {
      console.log("Err: Patch/relink/productToShelfSpot,", err);

      const msg = serverMsg("error", "relink", "product to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  // Product -> Box
  app.patch("/api/relink/productToBox", isAuth, async (req, res) => {
    const { prevLocation, productId, boxId } = req.body;

    try {
      // create query to remove old storage ref
      const { kind, _id } = prevLocation;

      if (kind === "shelfSpot") {
        const oldShelfSpotId = _id;
        await unlinkProductFromShelfSpotWithLocation(oldShelfSpotId, productId);
      }
      if (kind === "box") {
        const oldBoxId = _id;
        await unlinkProductFromBox(oldBoxId, productId);
      }

      const [product, box] = await Promise.all([
        linkItemToProductWithLocation(productId, "box", boxId),
        linkProductToBoxWithLocation(boxId, productId)
      ]);

      const msg = msgObj("Product and Box are now linked.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { box, product });
    } catch (err) {
      console.log("Err: PATCH/relink/productToBox,", err);

      const msg = serverMsg("error", "relink", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  // ------------ Scan two Unknown Items -----------------------
  // Product -> Shelf Spot
  app.patch("/api/scan/productToShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      // Check if Product has a location ---------------------------------------
      const product = await Product.findById(productId);

      // Remove old location
      if (product && product.productLocation && product.productLocation.kind) {
        const { kind, item } = product.productLocation;
        if (kind === "shelfSpot") {
          await unlinkBoxFromShelfSpotWithLocation(item, productId);
        } else if (kind === "box") {
          await unlinkProductFromBox(item, productId);
        }
      }

      // Update Product and ShelfSpot
      const [updateProduct, shelfSpot] = await Promise.all([
        linkItemToProductWithLocation(productId, "shelfSpot", shelfSpotId),
        linkItemToShelfSpotWithLocation(shelfSpotId, "product", productId)
      ]);

      const msg = msgObj(
        "Product and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      socketEmit(io, req.user._id, "storage");

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

  // Product -> Box
  app.patch("/api/scan/productToBox", isAuth, async (req, res) => {
    const { productId, boxId } = req.body;

    try {
      // Check if Product has a location ---------------------------------------
      const product = await Product.findById(productId);

      // Remove old location -------------------------------------------------
      if (product && product.productLocation && product.productLocation.kind) {
        const { kind, item } = product.productLocation;

        if (kind === "shelfSpot") {
          await unlinkProductFromShelfSpotWithLocation(item, productId);
        } else if (kind === "box") {
          await unlinkProductFromBox(item, productId);
        }
      }

      const [updateProduct, box] = await Promise.all([
        linkItemToProductWithLocation(productId, "box", boxId),
        linkProductToBoxWithLocation(boxId, productId)
      ]);

      const msg = msgObj("Product and Box are now linked.", "blue", "hide-3");

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { product: updateProduct, box });
    } catch (err) {
      console.log("Err: PATCH/SCAN/productToBox,", err);

      const msg = serverMsg("error", "scan", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  // Box -> Shelf Spot
  app.patch("/api/scan/boxToShelfSpot", isAuth, async (req, res) => {
    const { shelfSpotId, boxId } = req.body;

    try {
      // Check if Box has a location ---------------------------------------
      const box = await Box.findById(boxId);
      // Remove the old location ------------------------------------------
      if (box && box.shelfSpot) {
        const oldShelfSpotId = box.shelfSpot;
        await unlinkBoxFromShelfSpotWithLocation(oldShelfSpotId, boxId);
      }
      // update items
      const [updateBox, shelfSpot] = await Promise.all([
        linkShelfSpotToBoxWithLocation(boxId, shelfSpotId),
        linkItemToShelfSpotWithLocation(shelfSpotId, "box", boxId)
      ]);

      const msg = msgObj(
        "Box and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      socketEmit(io, req.user._id, "storage");

      serverRes(res, 200, msg, { box, shelfSpot });
    } catch (err) {
      console.log("Err: PATCH/SCAN/boxToShelfSpot,", err);

      const msg = serverMsg("error", "scan", "box to shelfSpot");

      serverRes(res, 400, msg, null);
    }
  });
};
