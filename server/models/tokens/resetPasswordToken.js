const mongoose = require("mongoose");
const { Schema } = mongoose;

const resetPasswordTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    // each token doc belongs to one user
    user: { type: Schema.Types.ObjectId, ref: "user" },
    // expires in 12 hours
    createdAt: { type: Date, default: Date.now(), expires: 43200 }
  },
  { timestamps: true }
);

const ResetPasswordToken = mongoose.model(
  "resetPasswordToken",
  resetPasswordTokenSchema
);

module.exports = ResetPasswordToken;
