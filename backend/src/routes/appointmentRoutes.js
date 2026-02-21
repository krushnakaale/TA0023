const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getPendingAppointments,
  respondAppointment,
  getAllPendingAppointments,
} = require("../controllers/appointmentController");

router.post("/", createAppointment);
router.get("/doctor/:doctorId", getPendingAppointments);
router.put("/:id/respond", respondAppointment);
// New route for all pending appointments
router.get("/pending/all", getAllPendingAppointments);

module.exports = router;
