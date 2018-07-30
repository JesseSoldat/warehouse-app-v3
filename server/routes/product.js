// models
const Product = require("../models/product");
const Counter = require("../models/counter");
const Customer = require("../models/customer");
const Producer = require("../models/producer");
// middleware
const isAuth = require("../middleware/isAuth");
// helpers
const buildProductsQuery = require("./helpers/buildProductsQuery");
// utils
const { msgObj, serverRes } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");
const mergeObjFields = require("../utils/mergeObjFields");
const stringParamsToIntegers = require("../utils/stringParamsToIntegers");

module.exports = app => {
  // Get All Products ------------------------------------------
  app.get("/api/products", isAuth, async (req, res) => {
    const shouldBeIntegers = ["skip", "limit", "page"];
    const query = stringParamsToIntegers(req.query, shouldBeIntegers);
    const mongoQuery = buildProductsQuery(query);

    try {
      const [products, count, totalCount] = await Promise.all([
        Product.find(mongoQuery)
          .skip(query.skip)
          .limit(query.limit),
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
          Product.findById(productId).populate("producer customer"),
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
      product["productLabel"] = await Counter.createProductLabel();
      await product.save();

      serverRes(res, 200, null, product);
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

      serverRes(res, 200, null, updatedProduct);
    } catch (err) {
      console.log("ERR: PATCH/api/products/:productId", err);

      const msg = serverMsg("error", "update", "product", "update error");
      serverRes(res, 400, msg, null);
    }
  });

  // Delete a Product -----------------------------------------------
  app.delete("/api/products/:productId", isAuth, async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId);

      const {
        productFolder,
        pictureFolder,
        packagingFolder,
        productPictures,
        packagingPictures
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
      }

      await product.remove();

      const msg = msgObj("The product was deleted.", "blue", "delete");

      serverRes(res, 200, msg, null);
    } catch (err) {
      console.log("ERR: DELETE/api/products/:productId", err);

      const msg = serverMsg("error", "delete", "product", "delete error");
      serverRes(res, 400, msg, null);
    }
  });
};
