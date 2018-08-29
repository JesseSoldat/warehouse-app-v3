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
const { addProductToShelfSpotPopLocIds } = require("../queries/product");

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
        addProductToShelfSpotPopLocIds(productId, shelfSpotId),
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
      console.log("Err: PATCH/link/productToShelfSpot,", err);

      const msg = serverMsg("error", "link", "product to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/relink/productToShelfSpot", isAuth, async (req, res) => {
    const { obj, prevLocation } = req.body;
    const { productId, shelfSpotId } = obj;
    const { kind, _id } = prevLocation;

    let oldRefQuery;

    try {
      // create query to remove old storage ref
      if (kind === "shelfSpot") {
        oldRefQuery = ShelfSpot.findByIdAndUpdate(
          _id,
          {
            $pull: {
              storedItems: { item: productId }
            }
          },
          { new: true }
        );
      }
      if (kind === "box") {
        oldRefQuery = Box.findByIdAndUpdate(
          _id,
          {
            $pull: {
              storedItems: productId
            }
          },
          { new: true }
        );
      }

      const [oldSpot, product, shelfSpot] = await Promise.all([
        oldRefQuery,
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
      console.log("Err: PATCH/relink/productToShelfSpot,", err);

      const msg = serverMsg("error", "relink", "product to shelf spot");

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
      console.log("Err: PATCH/link/productToBox,", err);

      const msg = serverMsg("error", "link", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/relink/productToBox", isAuth, async (req, res) => {
    const { obj, prevLocation } = req.body;
    const { productId, boxId } = obj;
    const { kind, _id } = prevLocation;

    let oldRefQuery;

    try {
      // create query to remove old storage ref
      if (kind === "shelfSpot") {
        oldRefQuery = ShelfSpot.findByIdAndUpdate(
          _id,
          {
            $pull: {
              storedItems: { item: productId }
            }
          },
          { new: true }
        );
      }
      if (kind === "box") {
        oldRefQuery = Box.findByIdAndUpdate(
          _id,
          {
            $pull: {
              storedItems: productId
            }
          },
          { new: true }
        );
      }

      const [oldSpot, product, box] = await Promise.all([
        oldRefQuery,
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
      console.log("Err: PATCH/relink/productToBox,", err);

      const msg = serverMsg("error", "relink", "product to box");

      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/link/boxToShelfSpot", isAuth, async (req, res) => {
    const { boxId, shelfSpotId } = req.body;

    try {
      await Promise.all([
        ShelfSpot.findByIdAndUpdate(
          shelfSpotId,
          { $addToSet: { storedItems: { kind: "box", item: boxId } } },
          { new: true }
        ),
        Box.findByIdAndUpdate(
          boxId,
          {
            $set: { shelfSpot: shelfSpotId }
          },
          { new: true }
        )
      ]);

      const updatedShelfSpot = await ShelfSpot.findById(shelfSpotId).populate({
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
      });

      emit(req.user._id);

      const msg = msgObj(
        "Box and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { shelfSpot: updatedShelfSpot });
    } catch (err) {
      console.log("Err: PATCH/boxToShelfSpot,", err);

      const msg = serverMsg("error", "link", "box to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });

  // SCAN TWO UNKOWN ITEMS REMOVING OLD REF -------------------------------
  // PRODUCT
  app.patch("/api/scan/productToShelfSpot", isAuth, async (req, res) => {
    const { productId, shelfSpotId } = req.body;

    try {
      // Check if Product has a location ---------------------------------------
      const product = await Product.findById(productId);

      // Remove old location
      if (product && product.productLocation && product.productLocation.kind) {
        const { kind, item } = product.productLocation;
        if (kind === "shelfSpot") {
          await ShelfSpot.findByIdAndUpdate(
            item,
            { $pull: { storedItems: { item: productId } } },
            { new: true }
          );
        } else if (kind === "box") {
          await Box.findByIdAndUpdate(
            item,
            { $pull: { storedItems: productId } },
            { new: true }
          );
        }
      }
      // Link Product to NEW Shelf Spot -------------------------------
      product["productLocation"] = {
        kind: "shelfSpot",
        item: shelfSpotId
      };

      const [updateProduct, shelfSpot] = await Promise.all([
        product.save(),
        ShelfSpot.findByIdAndUpdate(
          shelfSpotId,
          {
            $addToSet: {
              storedItems: { kind: "product", item: productId }
            }
          },
          { new: true }
        ).populate({
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
        })
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

  app.patch("/api/scan/productToBox", isAuth, async (req, res) => {
    const { productId, boxId } = req.body;

    try {
      // Check if Product has a location ---------------------------------------
      const product = await Product.findById(productId);

      // Remove old location -------------------------------------------------
      if (product && product.productLocation && product.productLocation.kind) {
        const { kind, item: _id } = product.productLocation;

        if (kind === "shelfSpot") {
          await ShelfSpot.findByIdAndUpdate(
            _id,
            {
              $pull: {
                storedItems: { item: productId }
              }
            },
            { new: true }
          );
        }
        if (kind === "box") {
          await Box.findByIdAndUpdate(
            _id,
            {
              $pull: {
                storedItems: productId
              }
            },
            { new: true }
          );
        }
      }

      // Link Product to NEW Box -------------------------------
      product["productLocation"] = {
        kind: "box",
        item: boxId
      };

      const [updateProduct, box] = await Promise.all([
        product.save(),
        Box.findByIdAndUpdate(
          boxId,
          {
            $addToSet: {
              storedItems: productId
            }
          },
          { new: true }
        ).populate({
          path: "shelfSpot",
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
        })
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

  // BOX
  app.patch("/api/scan/boxToShelfSpot", isAuth, async (req, res) => {
    const { shelfSpotId, boxId } = req.body;

    console.log(req.body);

    try {
      // Check if Box has a location ---------------------------------------
      const box = await Box.findById(boxId);
      // Remove the old location ------------------------------------------
      if (box && box.shelfSpot) {
        const oldShelfSpotId = box.shelfSpot;
        await ShelfSpot.findByIdAndUpdate(
          oldShelfSpotId,
          { $pull: { storedItems: { item: boxId } } },
          { new: true }
        );
      }
      // Link the Box with the NEW Shelf Spot ----------------------------
      box.shelfSpot = shelfSpotId;

      const [updateBox, shelfSpot] = await Promise.all([
        box.save(),
        ShelfSpot.findByIdAndUpdate(
          shelfSpotId,
          { $addToSet: { storedItems: { kind: "box", item: boxId } } },
          { new: true }
        ).populate({
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
        })
      ]);

      console.log("box", updateBox);

      emit(req.user._id);

      const msg = msgObj(
        "Box and Shelf Spot are now linked.",
        "blue",
        "hide-3"
      );

      serverRes(res, 200, msg, { box: updateBox, shelfSpot });
    } catch (err) {
      console.log("Err: PATCH/SCAN/boxToShelfSpot,", err);

      const msg = serverMsg("error", "scan", "box to shelfSpot");

      serverRes(res, 400, msg, null);
    }
  });
};
