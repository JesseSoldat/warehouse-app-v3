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
      const [shelfSpot, box] = await Promise.all([
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

      serverRes(res, 200, msg, { shelfSpot: updatedShelfSpot, box });
    } catch (err) {
      console.log("Err: PATCH/boxToShelfSpot,", err);

      const msg = serverMsg("error", "link", "box to shelf spot");

      serverRes(res, 400, msg, null);
    }
  });
};
