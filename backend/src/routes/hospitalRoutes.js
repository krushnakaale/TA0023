const express = require("express");
const router = express.Router();

const {
  getAllHospitals,
  getHospitalsByCity,
  getHospitalById,
  createHospital,
  updateHospital,
} = require("../controllers/hospitalController");

// Home page → All hospitals
router.get("/", getAllHospitals);

// Select City → Filter hospitals
router.get("/city/:city", getHospitalsByCity);

// Click Hospital → Details
router.get("/:id", getHospitalById);

// Admin → Add hospital
router.post("/", createHospital);

// Admin → Update beds / OPD
router.put("/:id", updateHospital);

router.get("/status/open", async (req, res) => {
  try {
    const hospitals = await Hospital.find({ opdStatus: "Open" });
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
