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

      type === "productPictures"
        ? product.productPictures.push(url)
        : product.packagingPictures.push(url);

      await product.save();

      const msg = msgObj("The product image was uploaded.", "blue", "hide-3");

      serverRes(res, 200, msg, product);
    } catch (err) {
      console.log("Err: POST/uploadProductImage,", err);

      const msg = serverMsg("error", "upload", "image");
      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/deleteProductImage/:productId", isAuth, async (req, res) => {
    const { productId } = req.params;
    const { url, type } = req.body;
    console.log("type", type);

    console.log("url", url);

    try {
      const query =
        type === "productPictures"
          ? { $pull: { productPictures: url } }
          : { $pull: { packagingPictures: url } };

      const product = await Product.findByIdAndUpdate(productId, query, {
        new: true
      });

      // console.log(product);

      const msg = msgObj("The product image was deleted.", "blue", "hide-3");

      serverRes(res, 200, msg, product);
    } catch (err) {
      console.log("Err: DELETE/deleteProductImage,", err);

      const msg = serverMsg("error", "delete", "image");
      serverRes(res, 400, msg, null);
    }
  });
};
