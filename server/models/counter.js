const mongoose = require("mongoose");
const { Schema } = mongoose;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  prodSeq: { type: Number, default: 0 }
});

CounterSchema.statics.createProductLabel = async function() {
  const Counter = this;
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "entityId" },
      { $inc: { prodSeq: 1 } },
      { new: true, upsert: true }
    );
    console.log(`Product Counter: ${counter.prodSeq}`);
    return Promise.resolve(counter.prodSeq);
  } catch (err) {
    return Promise.reject("Product Counter Error");
  }
};

const Counter = mongoose.model("counter", CounterSchema);

module.exports = Counter;
