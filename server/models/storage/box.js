const mongoose = require("mongoose");
const { Schema } = mongoose;

const BoxSchema = new Schema(
  {
    boxLabel: { type: String, required: true },
    storedItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "product"
      }
    ],
    shelfSpot: {
      type: Schema.Types.ObjectId,
      ref: "shelfSpot"
    }
  },
  { timestamps: true }
);

const Box = mongoose.model("box", BoxSchema);

module.exports = Box;
