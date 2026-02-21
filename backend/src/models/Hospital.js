const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: String,
    contact: String,

    totalBeds: {
      type: Number,
      default: 0,
    },
    availableBeds: {
      type: Number,
      default: 0,
    },
    icuBeds: {
      type: Number,
      default: 0,
    },

    opdStatus: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Closed",
    },

    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hospital", hospitalSchema);
