const mongoose = require("mongoose");
// models
const Box = require("../../models/storage/box");
const ShelfSpot = require("../../models/storage/shelfSpot");
// helpers
const randomMinMaxNum = require("./helpers/randomMinMaxNum");

module.exports = linkBoxesToShelfSpots = async () => {
  try {
    const [boxes, spotCount, spots] = await Promise.all([
      Box.find({}),
      ShelfSpot.countDocuments(),
      ShelfSpot.find({})
    ]);

    const shelfSpotWithBox = [];
    // Place boxes at different storage spots

    // create array of spots to with only the spot _id
    const spotIdsArray = [];

    spots.forEach((spot, i) => {
      spotIdsArray.push(spot._id);
    });

    boxes.forEach(async (box, i) => {
      let duplicateSpot = true;
      // place box at spot if no box there
      while (duplicateSpot) {
        const randomSpotIndex = randomMinMaxNum(1, spotCount - 1);
        // check the array to see if the spot has a box already
        const isIncluded = shelfSpotWithBox.includes(randomSpotIndex);

        if (isIncluded) {
          duplicateSpot = true;
        } else {
          // break out of the loop
          duplicateSpot = false;
          // add the index to accumalative list
          shelfSpotWithBox.push(randomSpotIndex);

          // get the random shelf spot
          const randomShelfSpot = spotIdsArray[randomSpotIndex];
          // convert it to an _id for mongooose
          const objectId = mongoose.Types.ObjectId(randomShelfSpot);

          // link the box to the shelf spot
          await Box.findByIdAndUpdate(box._id, {
            $set: { shelfSpot: objectId }
          });

          // add the box to the shelf's stored items
          await ShelfSpot.findByIdAndUpdate(randomShelfSpot, {
            $addToSet: { storedItems: { kind: "box", item: box._id } }
          });
        }
      }
    });

    // console.log("shelfSpotWithBox");
    // console.log(shelfSpotWithBox);
  } catch (err) {
    console.log("ERR: Link Seed", err);
  }
};
