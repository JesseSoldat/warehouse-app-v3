const faker = require("faker");

// models
const Customer = require("../../models/customer");
const Producer = require("../../models/producer");
const Product = require("../../models/product");
// helpers
const randomMinMaxNum = require("./helpers/randomMinMaxNum");
const randomDate = require("./helpers/randomDates");
const dropCollections = require("./helpers/dropCollections");
const generateArray = require("./helpers/generateArray");

const PRODUCTS_TO_ADD = 150;

const createProducts = labelNumber => ({
  productLabel: labelNumber + 1000, //unique
  // string
  brandName: faker.commerce.productName(),
  productName: faker.commerce.productName(),
  pointOfBuy: faker.address.city(),
  // number
  price: randomMinMaxNum(18, 6965),
  weight: randomMinMaxNum(1, 65),
  quantity: randomMinMaxNum(1, 65),
  amountOfPieces: randomMinMaxNum(1, 30),
  // date
  manufacturingDate: randomDate(new Date(2017, 0, 1), new Date()),
  // array of strings
  productMaterial: generateArray(randomMinMaxNum(1, 11), "productMaterial"),
  comments: generateArray(randomMinMaxNum(1, 11), "productAdjective"),
  packagingPictures: generateArray(randomMinMaxNum(1, 6), "image"),
  productPictures: generateArray(randomMinMaxNum(1, 11), "avatar"),
  // objects
  productMeasurments: {
    prodHeight: randomMinMaxNum(5, 25),
    prodWidth: randomMinMaxNum(5, 25),
    prodLength: randomMinMaxNum(5, 25)
  },
  packagingMeasurments: {
    packHeight: randomMinMaxNum(5, 25),
    packWidth: randomMinMaxNum(5, 25),
    packLength: randomMinMaxNum(5, 25)
  }
});

const linkProducerToProduct = async (product, producers) => {
  // create array of producer ids
  const producerIds = producers.map(p => p._id);
  // assign one producer to each product
  const randomProducer = randomMinMaxNum(1, producerIds.length - 1);
  product["producer"] = producerIds[randomProducer];
};

const linkCustomerToProduct = async (product, customers) => {
  // create array of customer ids
  const customersId = customers.map(c => c._id);
  // create array of customers for the current product
  const productCustomers = [];
  // assign multiple customers to each product
  const amountOfCustomers = randomMinMaxNum(1, 4);

  let times = 0;

  while (amountOfCustomers > times) {
    // pick one of the customerIds
    const randomCustomerId =
      customersId[randomMinMaxNum(1, customersId.length - 1)];

    const isIncluded = productCustomers.includes(randomCustomerId);

    if (isIncluded) {
    } else {
      ++times;
      productCustomers.push(randomCustomerId);
      product["customer"].push(randomCustomerId);
    }
  }
};

module.exports = seedProducts = async () => {
  try {
    // times will be the label
    let times = 0;
    await dropCollections([Product]);

    const [customers, producers] = await Promise.all([
      Customer.find({}),
      Producer.find({})
    ]);

    while (times < PRODUCTS_TO_ADD) {
      ++times;
      const product = new Product(createProducts(times));

      // add producers and customers to product
      await linkProducerToProduct(product, producers);
      await linkCustomerToProduct(product, customers);

      if (times < 10) {
        // console.log(`#${times}`);
        // console.log("producer");
        // console.log(product.producer);
        // console.log("customers");
        // console.log(product.customer);
      }

      product.save();
    }
  } catch (err) {
    console.log("An error occured while seeding the Products collection.");
  }
};
