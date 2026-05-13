
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    companyName: String,
    role: String,
    auditId: { type: String, required: true },
    annualSavings: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lead", leadSchema);
