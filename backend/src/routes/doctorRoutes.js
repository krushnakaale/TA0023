const express = require("express");
const router = express.Router();
const { getDoctorsByHospital } = require("../controllers/doctorController");

router.get("/hospital/:hospitalId", getDoctorsByHospital);

module.exports = router;
