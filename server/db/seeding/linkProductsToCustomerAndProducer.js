// models
const Customer = require("../../models/customer");
const Producer = require("../../models/producer");
const Product = require("../../models/product");
// helpers
const randomMinMaxNum = require("./helpers/randomMinMaxNum");

module.exports = linkProductsToCustomerAndProducer = async () => {
  try {
    const [
      customerCount,
      customers,
      producerCount,
      producers,
      products
    ] = await Promise.all([
      Customer.countDocuments(),
      Customer.find({}),
      Producer.countDocuments(),
      Producer.find({}),
      Product.find({})
    ]);
    // LINK PRODUCER AND CUSTOMERS TO PRODUCT ---------------------------
    // create array of producer ids
    const producerIds = producers.map(p => p._id);

    // create array of customer ids
    const customersId = customers.map(c => c._id);

    products.forEach(async (product, index) => {
      // create array of customers for the current product
      const productCustomers = [];

      // assign one producer to each product
      const randomProducer = randomMinMaxNum(1, producerCount - 1);
      product["producer"] = producerIds[randomProducer];

      // assign multiple customers to each product
      const amountOfCustomers = randomMinMaxNum(1, 4);

      let times = 0;

      while (amountOfCustomers > times) {
        // pick one of the customerIds
        const randomCustomerId =
          customersId[randomMinMaxNum(1, customerCount - 1)];

        const isIncluded = productCustomers.includes(randomCustomerId);

        if (isIncluded) {
        } else {
          ++times;
          productCustomers.push(randomCustomerId);
          product["customer"].push(randomCustomerId);
        }
      }

      await product.save();

      // console.log(`#${index} productCustomers`);
      // console.log(productCustomers);
    });

    // console.log("done");
  } catch (err) {}
};
