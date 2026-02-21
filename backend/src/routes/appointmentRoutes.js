const express = require("express");
const router = express.Router();
const {
  requestAppointment,
  respondAppointment,
} = require("../controllers/appointmentController");

// user requests appointment
router.post("/", requestAppointment);

// doctor respond
router.put("/:id/respond", respondAppointment);

module.exports = router;
