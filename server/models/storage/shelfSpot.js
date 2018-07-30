const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShelfSpotSchema = new Schema(
  {
    shelfSpotLabel: { type: String, required: true },
    shelf: {
      type: Schema.Types.ObjectId,
      ref: "shelf"
    },
    storedItems: [
      {
        kind: String,
        item: {
          type: Schema.Types.ObjectId,
          refPath: "storedItems.kind"
        }
      }
    ]
  },
  { timestamps: true }
);

const ShelfSpot = mongoose.model("shelfSpot", ShelfSpotSchema);

module.exports = ShelfSpot;
