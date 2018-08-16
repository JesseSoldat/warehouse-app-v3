// models
const Rack = require("../../models/storage/rack");
const Shelf = require("../../models/storage/shelf");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");

module.exports = (app, io) => {
  const emit = senderId => {
    io.emit("update", {
      msg: "storage",
      senderId,
      timestamp: Date.now()
    });
  };
  // Get all shelves
  app.get("/api/shelves", isAuth, async (req, res) => {
    try {
      const shelves = await Shelf.find({});

      serverRes(res, 200, null, shelves);
    } catch (err) {
      console.log("Err: GET/api/shelf", err);

      const msg = serverMsg("error", "fetch", "shelves");
      serverRes(res, 400, msg, null);
    }
  });
  // Get a single shelf
  app.get("/api/shelves/:shelfId", isAuth, async (req, res) => {
    const { shelfId } = req.params;

    try {
      const shelf = await Shelf.findById(shelfId)
        .populate({
          path: "shelfSpots",
          populate: { path: "storedItems.item " }
        })
        .populate({
          path: "rack",
          populate: {
            path: "storage"
          }
        });

      serverRes(res, 200, null, shelf);
    } catch (err) {
      console.log("Err: GET/api/shelf/:shelfId", err);

      const msg = serverMsg("error", "fetch", "shelf");
      serverRes(res, 400, msg, null);
    }
  });
  // Create a new shelf inside a rack and link it to the rack
  app.post("/api/shelves/:rackId", isAuth, async (req, res) => {
    let { rackId } = req.params;
    const newShelf = new Shelf(req.body);

    newShelf["rack"] = rackId;

    try {
      const [shelf, rack] = await Promise.all([
        newShelf.save(),
        Rack.findByIdAndUpdate(
          rackId,
          {
            $addToSet: {
              shelves: newShelf._id
            }
          },
          { new: true }
        )
          .populate({
            path: "shelves",
            populate: {
              path: "shelfSpots",
              populate: {
                path: "storedItems.item ",
                populate: {
                  path: "storedItems"
                }
              }
            }
          })
          .populate("storage")
      ]);

      const msg = msgObj("The shelf was saved.", "blue", "hide-3");

      emit(req.user._id);

      serverRes(res, 200, msg, { rack, shelfId: shelf._id });
    } catch (err) {
      console.log("Err: POST/api/shelf/:rackId", err);

      const msg = serverMsg("error", "create", "shelf", "create error");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a shelf
  app.patch("/api/shelves/:shelfId", isAuth, async (req, res) => {
    const { shelfId } = req.params;
    const update = req.body;
    try {
      await Shelf.findByIdAndUpdate(shelfId, mergeObjFields("", update), {
        new: true
      });

      const msg = msgObj("The shelf was updated.", "blue", "hide-3");

      emit(req.user._id);

      serverRes(res, 200, msg, { ...update, shelfId });
    } catch (err) {
      console.log("Err: PATCH/api/shelf/:shelfId", err);

      const msg = serverMsg("error", "update", "shelf", "update error");
      serverRes(res, 400, msg, null);
    }
  });
  // delete a shelf
  app.delete("/api/shelves/:shelfId", isAuth, async (req, res) => {
    const { shelfId } = req.params;
    try {
      let shelf = await Shelf.findById(shelfId);

      // check for shelf spots
      if (shelf.shelfSpots.length !== 0) {
        const msg = msgObj(
          "Delete or relink all shelf spots of this shelf first.",
          "red"
        );
        return serverRes(res, 400, msg, shelf);
      }

      const rackId = shelf.rack;

      await Promise.all([
        Rack.findByIdAndUpdate(rackId, {
          $pull: { shelves: shelfId }
        }),
        shelf.remove()
      ]);

      const msg = msgObj("Shelf deleted.", "blue", "hide-3");

      emit(req.user._id);

      serverRes(res, 200, msg, { shelfId: shelf._id });
    } catch (err) {
      console.log("Err: DELETE/api/shelves/:shelfId", err);

      const msg = msgObj(errMsg("delete", "shelf"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
