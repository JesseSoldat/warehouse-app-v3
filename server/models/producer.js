const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProducerSchema = new Schema({
  producerName: { type: String, default: "", required: true },
  producerContact: { type: String, default: "" },
  producerAddress: { type: String, default: "" }
});

const Producer = mongoose.model("producer", ProducerSchema);

module.exports = Producer;
