// models
const Box = require("../../models/storage/box");
// middleware
const isAuth = require("../../middleware/isAuth");
// helpers
const buildBoxesQuery = require("../helpers/buildBoxesQuery");
// utils
const { msgObj, serverRes } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");
const stringParamsToIntegers = require("../../utils/stringParamsToIntegers");
// queries
const { getAllBoxesWithLocations, getBox } = require("../queries/box");
const {
  linkBoxToShelfSpot,
  unlinkBoxFromShelfSpot
} = require("../queries/shelfSpot");

module.exports = (app, io) => {
  const emit = senderId => {
    io.emit("update", {
      msg: "storage",
      senderId,
      timestamp: Date.now()
    });
  };

  app.post("/api/boxes/search", isAuth, async (req, res) => {
    const { query } = req.body;

    const shouldBeIntegers = ["skip", "limit", "page"];
    const { skip, limit } = stringParamsToIntegers(query, shouldBeIntegers);

    const mongoQuery = buildBoxesQuery(query);

    try {
      const [boxes, count, totalCount] = await Promise.all([
        getAllBoxesWithLocations(skip, limit, mongoQuery),
        Box.find(mongoQuery).countDocuments(),
        Box.find({}).countDocuments()
      ]);

      query.count = count;
      query.totalCount = totalCount;

      serverRes(res, 200, null, { boxes, query });
    } catch (err) {
      console.log("Err: GET/BOXES", err);

      const msg = serverMsg("error", "fetch", "boxes");
      serverRes(res, 400, msg, null);
    }
  });

  // Box with NO location
  app.get("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    try {
      const box = await getBox(boxId);

      serverRes(res, 200, null, box);
    } catch (err) {
      console.log("Err: GET/SINGLE BOX NO LOCATION", err);

      const msg = serverMsg("error", "fetch", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // -------------------------- CREATE NEW BOX --------------------------------
  // POST BOX with no location
  app.post("/api/boxes", isAuth, async (req, res) => {
    const box = new Box(req.body);

    try {
      await box.save();

      emit(req.user._id);

      const msg = msgObj("Box created.", "blue", "hide-3");

      serverRes(res, 200, msg, box);
    } catch (err) {
      console.log("ERR: POST/BOX", err);

      const msg = serverMsg("error", "post", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // POST BOX with location
  app.post("/api/boxes/link/:shelfSpotId", isAuth, async (req, res) => {
    const { shelfSpotId } = req.params;
    const box = new Box(req.body);
    try {
      await Promise.all([box.save(), linkBoxToShelfSpot(shelfSpotId, box._id)]);

      emit(req.user._id);

      const msg = msgObj("Box created.", "blue", "hide-3");
      serverRes(res, 200, msg, box);
    } catch (err) {
      console.log("ERR: POST/BOX/WithLocation", err);

      const msg = serverMsg("error", "post", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // -------------------------- EDIT BOX --------------------------------
  app.patch("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    const update = req.body;

    try {
      await Box.findByIdAndUpdate(boxId, mergeObjFields("", req.body), {
        new: true
      });

      emit(req.user._id);

      const msg = msgObj("Box updated.", "blue", "hide-3");
      serverRes(res, 200, msg, { ...update, boxId });
    } catch (err) {
      console.log("ERR: PATCH/BOX", err);

      const msg = serverMsg("error", "update", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // -------------------------- DELETE BOX --------------------------------
  app.delete("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    try {
      const box = await Box.findById(boxId);

      // check for stored items
      if (box["storedItems"].length !== 0) {
        const msg = msgObj(
          "Delete or relink all products of this box first.",
          "red",
          "hide-3"
        );
        serverRes(res, 400, msg, box);
      }
      // no stored items
      else {
        // check if the box is stored on a shelf spot
        const shelfSpotId = box["shelfSpot"];
        if (shelfSpotId) {
          await unlinkBoxFromShelfSpot(shelfSpotId, boxId);
        }
        // delete the box
        box.remove();

        const msg = msgObj("Box deleted", "blue", "hide-3");

        serverRes(res, 200, msg, { boxId: box._id });
      }
    } catch (err) {
      console.log("ERR: Delet/box", err);

      const msg = serverMsg("error", "delete", "boxes");
      serverRes(res, 400, msg, null);
    }
  });
};
