const faker = require("faker");

// models
const Producer = require("../../models/producer");
// helpers
const createAddress = require("./helpers/createAddress");
const dropCollections = require("./helpers/dropCollections");

const PRODUCER_TO_ADD = 15;

const createProducer = () => ({
  producerName: faker.name.findName(),
  producerContact: faker.phone.phoneNumber(),
  producerAddress: createAddress()
});

module.exports = seedProducer = async () => {
  try {
    let times = 0;
    await dropCollections([Producer]);

    while (times < PRODUCER_TO_ADD) {
      ++times;

      const producer = new Producer(createProducer());

      await producer.save();
    }
  } catch (err) {
    console.log("An error occured while seeding the Producer collection.");
  }
};
