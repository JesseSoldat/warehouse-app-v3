// models
const Product = require("../models/product");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");

module.exports = app => {
  app.post("/api/uploadProductImage/:productId", isAuth, async (req, res) => {
    const { productId } = req.params;
    const { url, type } = req.body;

    try {
      const product = await Product.findById(productId);

      if (type === "productPictures") {
        product.productPictures.push(url);
      } else if (type === "packagingPictures") {
        product.packagingPictures.push(url);
      }

      await product.save();

      const msg = msgObj("The product image was uploaded.", "blue", "hide-3");

      serverRes(res, 200, msg, product);
    } catch (err) {
      console.log("Err: GET/uploadProductImage,", err);

      const msg = serverMsg("error", "upload", "image");
      serverRes(res, 400, msg, null);
    }
  });
};
