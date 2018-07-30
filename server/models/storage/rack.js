const mongoose = require("mongoose");
const { Schema } = mongoose;

const RackSchema = new Schema(
  {
    rackLabel: { type: String, required: true },
    storage: {
      type: Schema.Types.ObjectId,
      ref: "storage"
    },
    shelves: [
      {
        type: Schema.Types.ObjectId,
        ref: "shelf"
      }
    ]
  },
  { timestamps: true }
);

// COUNTER SYSTEM ----------------------------------
// shelfLabelCounter: { type: Number, required: true },

// RackSchema.statics.getShelfLabel = async function(rackId) {
//   const Rack = this;
//   try {
//     const rack = await Rack.findByIdAndUpdate(
//       rackId,
//       { $inc: { shelfLabelCounter: 1 } },
//       { new: true, upsert: true }
//     );
//     return Promise.resolve(rack.shelfLabelCounter);
//   } catch (err) {
//     return Promise.reject("An error occured while creating the shelf label");
//   }
// };

const Rack = mongoose.model("rack", RackSchema);

module.exports = Rack;
