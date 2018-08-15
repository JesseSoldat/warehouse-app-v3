// models
const Product = require("../models/product");
const Customer = require("../models/customer");
const Producer = require("../models/producer");
const ShelfSpot = require("../models/storage/shelfSpot");
const Box = require("../models/storage/box");
// middleware
const isAuth = require("../middleware/isAuth");
// helpers
const buildProductsQuery = require("./helpers/buildProductsQuery");
// utils
const { msgObj, serverRes } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");
const mergeObjFields = require("../utils/mergeObjFields");
const stringParamsToIntegers = require("../utils/stringParamsToIntegers");

module.exports = (app, io) => {
  const emit = senderId => {
    io.emit("update", {
      msg: "product",
      senderId,
      timestamp: Date.now()
    });
  };
  // Get All Products ------------------------------------------
  app.get("/api/products", isAuth, async (req, res) => {
    const shouldBeIntegers = ["skip", "limit", "page"];
    const query = stringParamsToIntegers(req.query, shouldBeIntegers);
    const mongoQuery = buildProductsQuery(query);

    try {
      const [products, count, totalCount] = await Promise.all([
        Product.find(mongoQuery)
          .skip(query.skip)
          .limit(query.limit)
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
        Product.find(mongoQuery).countDocuments(),
        Product.find({}).countDocuments()
      ]);

      query.count = count;
      query.totalCount = totalCount;

      serverRes(res, 200, null, { products, query });
    } catch (err) {
      console.log("ERR: GET/api/products", err);

      const msg = serverMsg("error", "fetch", "products");
      serverRes(res, 400, msg, null);
    }
  });

  // Get Producers & Customers for Product Form (Form Data)
  app.get("/api/products/clients", isAuth, async (req, res) => {
    try {
      const [customers, producers] = await Promise.all([
        Customer.find({}),
        Producer.find({})
      ]);
      serverRes(res, 200, null, { customers, producers });
    } catch (err) {
      console.log("ERR: GET/api/products/clients", err);

      const msg = serverMsg("error", "fetch", "form data");
      serverRes(res, 400, msg, null);
    }
  });

  // Products & Producers & Customer for Product Form (Form Data)
  app.get(
    "/api/products/productWithClients/:productId",
    isAuth,
    async (req, res) => {
      const { productId } = req.params;
      try {
        const [product, customers, producers] = await Promise.all([
          Product.findById(productId)
            .populate("producer customer")
            .populate({
              path: "productLocation.item",
              populate: {
                // shelf = shelfSpot
                // shelfSpot = box
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
          Customer.find({}),
          Producer.find({})
        ]);
        serverRes(res, 200, null, { product, customers, producers });
      } catch (err) {
        console.log("ERR: GET/api/products/productWithClients/:productId", err);

        const msg = serverMsg("error", "fetch", "form data");
        serverRes(res, 400, msg, null);
      }
    }
  );

  // Get a Single Product ----------------------------------------
  app.get("/api/products/:productId", isAuth, async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId)
        .populate("customer producer")
        .populate({
          path: "productLocation.item",
          populate: {
            // shelf = shelfSpot
            // shelfSpot = box
            path: "shelf shelfSpot",
            populate: {
              path: "shelf rack",
              populate: { path: "rack storage", populate: { path: "storage" } }
            }
          }
        });

      serverRes(res, 200, null, product);
    } catch (err) {
      console.log("ERR: GET/api/products/:productId", err);

      const msg = serverMsg("error", "fetch", "product");
      serverRes(res, 400, msg, null);
    }
  });

  // Post a Product ---------------------------------------------
  app.post("/api/products", isAuth, async (req, res) => {
    const { producerId, customerIds } = req.body;
    const product = new Product(req.body);

    if (customerIds) {
      product["customer"] = customerIds;
    }

    if (producerId) {
      product["producer"] = producerId;
    }

    try {
      await product.save();

      emit(req.user._id);

      const msg = msgObj("The product was created.", "blue", "hide-3");

      serverRes(res, 200, msg, product);
    } catch (err) {
      console.log("ERR: POST/api/products", err);

      const msg = serverMsg("error", "save", "product", "create error");
      serverRes(res, 400, msg, null);
    }
  });

  // Update a Product --------------------------------------------
  app.patch("/api/products/:productId", isAuth, async (req, res) => {
    const { productId } = req.params;
    const { producerId, customerIds } = req.body;
    const product = req.body;

    if (producerId) {
      product["producer"] = producerId;
    }

    if (customerIds) {
      product["customer"] = customerIds;
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        mergeObjFields("", product),
        { new: true }
      );

      emit(req.user._id);

      const msg = msgObj("The product was updated.", "blue", "hide-3");

      serverRes(res, 200, msg, updatedProduct);
    } catch (err) {
      console.log("ERR: PATCH/api/products/:productId", err);

      const msg = serverMsg("error", "update", "product", "update error");
      serverRes(res, 400, msg, null);
    }
  });

  // Delete a Product -----------------------------------------------
  app.delete("/api/products/:productId", isAuth, async (req, res) => {
    const { productId } = req.params;
    const options = {};

    try {
      const product = await Product.findById(productId);

      const {
        productFolder,
        pictureFolder,
        packagingFolder,
        productPictures,
        packagingPictures,
        productLocation
      } = product;

      // if any of these exist
      if (
        productFolder ||
        pictureFolder ||
        packagingFolder ||
        (productPictures && productPictures.length > 0) ||
        (productPictures && packagingPictures.length > 0)
      ) {
        const msg = msgObj(
          "Delete all pictures and their parent folders first.",
          "red",
          "delete err"
        );

        return serverRes(res, 400, msg, product);
      } else if (productLocation) {
        const { kind, item } = productLocation;
        switch (kind) {
          case "shelfSpot":
            const shelfSpotId = item;

            const shelf = await ShelfSpot.findByIdAndUpdate(
              shelfSpotId,
              {
                $pull: {
                  storedItems: { item: productId }
                }
              },
              { new: true }
            );

            options["update"] = "storage";
            console.log("removed product from shelf spot");
            break;

          case "box":
            const boxId = item;

            await Box.findByIdAndUpdate(
              boxId,
              {
                $pull: {
                  storedItems: productId
                }
              },
              { new: true }
            );

            options["update"] = "storage";
            break;

          default:
            break;
        }
      }

      await product.remove();

      emit(req.user._id);

      const msg = msgObj("The product was deleted.", "blue", "hide-3");

      serverRes(res, 200, msg, options);
    } catch (err) {
      console.log("ERR: DELETE/api/products/:productId", err);

      const msg = serverMsg("error", "delete", "product", "delete error");
      serverRes(res, 400, msg, null);
    }
  });
};
