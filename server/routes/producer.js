// models
const Producer = require("../models/producer");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, msgObj } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");
const mergeObjFields = require("../utils/mergeObjFields");

module.exports = app => {
  // Get all of the producers ------------------------------
  app.get("/api/producers", isAuth, async (req, res) => {
    try {
      const producers = await Producer.find({}).sort({ $natural: -1 });

      serverRes(res, 200, null, producers);
    } catch (err) {
      console.log("Err: GET/api/producers,", err);

      const msg = serverMsg("error", "get", "producers");
      serverRes(res, 400, msg, null);
    }
  });
  // Get one producer -----------------------------------------
  app.get("/api/producers/:producerId", isAuth, async (req, res) => {
    const { producerId } = req.params;
    try {
      const producer = await Producer.findById(producerId);

      serverRes(res, 200, null, producer);
    } catch (err) {
      console.log("Err: GET/api/producers/:producerId,", err);

      const msg = serverMsg("error", "get", "producer");
      serverRes(res, 400, msg, null);
    }
  });
  // Create a new producer ------------------------------------
  app.post("/api/producers", isAuth, async (req, res) => {
    const producer = new Producer(req.body);
    try {
      await producer.save();

      serverRes(res, 200, null, producer);
    } catch (err) {
      console.log("Err: POST/api/producers,", err);

      const msg = serverMsg("error", "save", "producer");
      serverRes(res, 400, msg, null);
    }
  });
  // Edit a producer
  app.patch("/api/producers/:producerId", isAuth, async (req, res) => {
    const { producerId } = req.params;
    try {
      const producer = await Producer.findByIdAndUpdate(
        producerId,
        mergeObjFields("", req.body),
        { new: true }
      );

      serverRes(res, 200, null, producer);
    } catch (err) {
      console.log("Err: PATCH/api/producers,", err);

      const msg = serverMsg("error", "update", "producer", "update error");
      serverRes(res, 400, msg, null);
    }
  });
  // Delete a producer
  app.delete("/api/producers/:producerId", isAuth, async (req, res) => {
    const { producerId } = req.params;
    try {
      const producer = await Producer.findByIdAndRemove(producerId);

      const msg = msgObj("The producer was deleted.", "blue", "delete");

      serverRes(res, 200, msg, producer);
    } catch (err) {
      console.log("Err: DELETE/api/producers/:producerId,", err);

      const msg = serverMsg("error", "delete", "producer", "delete error");
      serverRes(res, 400, msg, null);
    }
  });
};
