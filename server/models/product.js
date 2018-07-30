const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductMeasurmentsSchema = new Schema({
  prodHeight: { type: Number, default: 0 },
  prodWidth: { type: Number, default: 0 },
  prodLength: { type: Number, default: 0 }
});

const PackagingMeasurmentsSchema = new Schema({
  packHeight: { type: Number, default: 0 },
  packWidth: { type: Number, default: 0 },
  packLength: { type: Number, default: 0 }
});

const ProductSchema = new Schema(
  {
    // required
    productLabel: { type: Number, required: true, unique: true, default: 0 },
    brandName: { type: String, trim: true, minlength: 1, required: true },
    productName: { type: String, required: true },
    // Number
    price: { type: Number, trim: true, minlength: 1, default: 0 },
    quantity: { type: Number, default: 1 },
    weight: { type: Number, trim: true, minlength: 1, default: 0 },
    amountOfPieces: { type: Number, default: 0 },
    // String
    pointOfBuy: { type: String, trim: true, default: "" },
    // Array of String
    productPictures: { type: [String], trim: true },
    packagingPictures: { type: [String], trim: true },
    productMaterial: { type: [String] },
    comments: { type: [String], trim: true },
    // Date
    manufacturingDate: { type: Date },
    // Ref to Schema
    productMeasurments: { type: ProductMeasurmentsSchema },
    packagingMeasurments: { type: PackagingMeasurmentsSchema },
    // Ref to Model
    producer: { type: Schema.Types.ObjectId, ref: "producer" },
    customer: [{ type: Schema.Types.ObjectId, ref: "customer" }],
    productLocation: {
      kind: String,
      item: { type: Schema.Types.ObjectId, refPath: "productLocation.kind" }
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
