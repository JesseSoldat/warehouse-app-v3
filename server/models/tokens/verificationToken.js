const mongoose = require("mongoose");
const { Schema } = mongoose;

const VerificationTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    token: { type: String, required: true },
    // the user has 12 hours to verify there email
    createdAt: { type: Date, default: Date.now(), expires: 43200 }
  },
  { timestamps: true }
);

const VerificationToken = mongoose.model(
  "verificationToken",
  VerificationTokenSchema
);

module.exports = VerificationToken;
