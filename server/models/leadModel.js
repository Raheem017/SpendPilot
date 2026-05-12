const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    email: String,

    companyName: String,

    role: String,

    teamSize: Number,
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Lead", leadSchema);
