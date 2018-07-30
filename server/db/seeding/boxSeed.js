const faker = require("faker");

// models
const Box = require("../../models/storage/box");
// helpers
const dropCollections = require("./helpers/dropCollections");

const BOXES_TO_ADD = 30;

const createBoxes = () => {
  return {
    boxLabel: faker.random.number(),
    storedItems: [],
    shelfSpot: null
  };
};

module.exports = boxSeed = async () => {
  let times = 0;
  try {
    await dropCollections([Box]);

    while (times < BOXES_TO_ADD) {
      ++times;

      const box = new Box(createBoxes());
      await box.save();
    }
  } catch (err) {
    console.log("ERR: Seeding Boxes", err);
  }
};
