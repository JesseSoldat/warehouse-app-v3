const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  customerName: { type: String, default: "", required: true },
  customerContact: { type: String, default: "" },
  customerAddress: { type: String, default: "" }
});

const Customer = mongoose.model("customer", CustomerSchema);

module.exports = Customer;
