const faker = require("faker");

// models
const Customer = require("../../models/customer");
// helpers
const createAddress = require("./helpers/createAddress");
const dropCollections = require("./helpers/dropCollections");

const CUSTOMER_TO_ADD = 15;

const createCustomer = () => ({
  customerName: faker.name.findName(),
  customerContact: faker.phone.phoneNumber(),
  customerAddress: createAddress()
});

module.exports = seedCustomer = async () => {
  try {
    let times = 0;
    await dropCollections([Customer]);

    while (times < CUSTOMER_TO_ADD) {
      ++times;

      const customer = new Customer(createCustomer());

      await customer.save();
    }
  } catch (err) {
    console.log("An error occured while seeding the Customer collection.");
  }
};
