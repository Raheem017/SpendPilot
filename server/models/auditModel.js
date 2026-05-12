const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    publicId: String,

    tools: Array,

    monthlySavings: Number,

    annualSavings: Number,

    recommendations: Array,

    summary: String,
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Audit", auditSchema);
