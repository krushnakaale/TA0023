const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    token: String, // generated if accepted
    rejectionReason: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
