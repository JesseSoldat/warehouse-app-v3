// models
const Box = require("../../models/storage/box");
// middleware
const isAuth = require("../../middleware/isAuth");
// helpers
const buildBoxesQuery = require("../helpers/buildBoxesQuery");
const checkForStoredItems = require("../helpers/boxCheckForStoredItems");
const socketEmit = require("../helpers/socketEmit");
// utils
const { msgObj, serverRes } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const stringParamsToIntegers = require("../../utils/stringParamsToIntegers");
// queries
const {
  getAllBoxesWithLocation,
  getBoxWithLocation,
  editBox,
  linkShelfSpotToBoxWithLocation
} = require("../queries/box");
const {
  linkItemToShelfSpotWithLocation,
  unlinkBoxFromShelfSpotWithLocation
} = require("../queries/shelfSpot");

module.exports = (app, io) => {
  app.post("/api/boxes/search", isAuth, async (req, res) => {
    const { query } = req.body;

    const shouldBeIntegers = ["skip", "limit", "page"];
    const { skip, limit } = stringParamsToIntegers(query, shouldBeIntegers);

    const mongoQuery = buildBoxesQuery(query);

    try {
      const [boxes, count, totalCount] = await Promise.all([
        getAllBoxesWithLocation(skip, limit, mongoQuery),
        Box.find(mongoQuery).countDocuments(),
        Box.find({}).countDocuments()
      ]);

      query.count = count;
      query.totalCount = totalCount;

      serverRes(res, 200, null, { boxes, query });
    } catch (err) {
      console.log("Err: Get/Boxes", err);

      const msg = serverMsg("error", "fetch", "boxes");
      serverRes(res, 400, msg, null);
    }
  });

  // Single Box
  app.get("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    try {
      const box = await getBoxWithLocation(boxId);

      serverRes(res, 200, null, { box });
    } catch (err) {
      console.log("Err: Get/Box", err);

      const msg = serverMsg("error", "fetch", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // -------------------- Create Box ------------------------
  // POST BOX with no location
  app.post("/api/boxes", isAuth, async (req, res) => {
    const box = new Box(req.body);

    try {
      await box.save();

      socketEmit(io, req.user._id, "box");

      const msg = msgObj("Box created.", "blue", "hide-3");

      serverRes(res, 200, msg, { box });
    } catch (err) {
      console.log("ERR: Create Box", err);

      const msg = serverMsg("error", "post", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // POST BOX with location
  app.post("/api/boxes/link/:shelfSpotId", isAuth, async (req, res) => {
    const { shelfSpotId } = req.params;
    let box = new Box(req.body);
    try {
      const [updatedBox, shelfSpot] = await Promise.all([
        box.save(),
        linkItemToShelfSpotWithLocation(shelfSpotId, "box", box._id)
      ]);

      box = await linkShelfSpotToBoxWithLocation(box._id, shelfSpotId);

      socketEmit(io, req.user._id, "box");

      const msg = msgObj("Box created.", "blue", "hide-3");
      serverRes(res, 200, msg, { box, shelfSpot });
    } catch (err) {
      console.log("ERR: Crete Box WithLocation", err);

      const msg = serverMsg("error", "post", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // ----------------------- Edit Box ------------------------------
  app.patch("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;

    try {
      const box = await editBox(boxId, req.body);

      socketEmit(io, req.user._id, "box");

      const msg = msgObj("Box updated.", "blue", "hide-3");

      serverRes(res, 200, msg, { box });
    } catch (err) {
      console.log("ERR: PATCH/BOX", err);

      const msg = serverMsg("error", "update", "box");
      serverRes(res, 400, msg, null);
    }
  });

  // ---------------------- Delete Box ------------------------------
  // DELETE BOX with no location
  app.delete("/api/boxes/:boxId", isAuth, async (req, res) => {
    const { boxId } = req.params;
    let msg;
    try {
      const box = await Box.findById(boxId);

      // --------- Check for Stored Items ---------
      msg = checkForStoredItems(box);

      if (msg) return serverRes(res, 400, msg, null);

      // ------------ No Stored Items -----------
      box.remove();

      socketEmit(io, req.user._id, "box");

      msg = msgObj("Box deleted", "blue", "hide-3");

      serverRes(res, 200, msg, { boxId: box._id });
    } catch (err) {
      console.log("ERR: Delete/box", err);

      const msg = serverMsg("error", "delete", "boxes");
      serverRes(res, 400, msg, null);
    }
  });

  // Delete Box with location
  app.delete("/api/boxes/:shelfSpotId/:boxId", isAuth, async (req, res) => {
    const { boxId, shelfSpotId } = req.params;
    let msg;
    try {
      const box = await Box.findById(boxId);

      // --------- Check for Stored Items ---------
      msg = checkForStoredItems(box);

      if (msg) return serverRes(res, 400, msg, null);

      // ------------ No Stored Items -----------
      // UNLINK Box from ShelfSpot
      const shelfSpot = await unlinkBoxFromShelfSpotWithLocation(
        shelfSpotId,
        boxId
      );

      box.remove();

      socketEmit(io, req.user._id, "box");

      msg = msgObj("Box delete and removed from ShelfSpot", "blue", "hide-3");

      serverRes(res, 200, msg, { shelfSpot, boxId: box._id });
    } catch (err) {
      console.log("ERR: Delete/box/unlink", err);

      const msg = serverMsg("error", "delete", "boxes");
      serverRes(res, 400, msg, null);
    }
  });
};
