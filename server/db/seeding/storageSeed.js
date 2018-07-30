const faker = require("faker");
// get the unique object id
const mongoose = require("mongoose");

// models
const Storage = require("../../models/storage/storage");
const Rack = require("../../models/storage/rack");
const Shelf = require("../../models/storage/shelf");
const ShelfSpot = require("../../models/storage/shelfSpot");

// helpers
const randomMinMaxNum = require("./helpers/randomMinMaxNum");
const dropCollections = require("./helpers/dropCollections");

const STORAGES_TO_ADD = 3;

// create ------------------------------
const createShelfSpots = async shelfId => {
  const SHELFSPOTS_TO_ADD = randomMinMaxNum(2, 7);

  const shelfSpotsIds = [];
  let times = 0;

  while (times < SHELFSPOTS_TO_ADD) {
    ++times;

    const shelfSpotsId = mongoose.Types.ObjectId();

    shelfSpotsIds.push(shelfSpotsId);

    const shelfSpot = new ShelfSpot({
      _id: shelfSpotsId,
      shelfSpotLabel: randomMinMaxNum(1, 1000),
      shelf: shelfId
    });

    try {
      await shelfSpot.save();
      // console.log("saves shelfSpot: ", times);
    } catch (err) {
      console.log("ERR: createShelfSpots");
    }
  }
  return shelfSpotsIds;
};

const createShelves = async rackId => {
  const SHELVES_TO_ADD = randomMinMaxNum(2, 7);

  const shelfIds = [];
  let times = 0;

  while (times < SHELVES_TO_ADD) {
    ++times;
    const shelfId = mongoose.Types.ObjectId();

    shelfIds.push(shelfId);

    const shelf = new Shelf({
      _id: shelfId,
      shelfLabel: randomMinMaxNum(1, 1000),
      rack: rackId,
      shelfSpots: []
    });
    try {
      const shelfSpotsIds = await createShelfSpots(shelfId);

      shelfSpotsIds.forEach(shelfSpotId => shelf.shelfSpots.push(shelfSpotId));

      await shelf.save();
    } catch (err) {
      console.log("ERR: createShelves");
    }
  }
  return shelfIds;
};

const createRacks = async storageId => {
  const RACKS_TO_ADD = randomMinMaxNum(2, 7);

  const rackIds = [];
  let times = 0;

  while (times < RACKS_TO_ADD) {
    ++times;

    const rackId = mongoose.Types.ObjectId();

    rackIds.push(rackId);

    const rack = new Rack({
      _id: rackId,
      storage: storageId,
      rackLabel: randomMinMaxNum(1, 1000),
      shelves: []
    });

    try {
      const shelfIds = await createShelves(rackId);

      shelfIds.forEach(shelfId => rack.shelves.push(shelfId));

      await rack.save();
    } catch (err) {
      console.log("ERR: createRacks");
    }
  }

  return rackIds;
};

const createStorages = async () => {
  const storageId = mongoose.Types.ObjectId();

  const storage = new Storage({
    _id: storageId,
    storageLabel: faker.random.word(), //unique
    description: faker.lorem.sentence(),
    racks: []
  });

  try {
    const rackIds = await createRacks(storageId);

    rackIds.forEach(rackId => storage.racks.push(rackId));

    await storage.save();
  } catch (err) {
    console.log("ERR: createStorages");
  }
};

module.exports = seedStorages = async () => {
  let times = 0;

  try {
    const collections = [Storage, Rack, Shelf, ShelfSpot];
    await dropCollections(collections);

    // STORAGE --------------------------------------------
    while (times < STORAGES_TO_ADD) {
      ++times;
      await createStorages();
    }
    console.log("storage seed done");
  } catch (err) {
    console.log("An error occured while seeding the Storage collection.");
  }
};
