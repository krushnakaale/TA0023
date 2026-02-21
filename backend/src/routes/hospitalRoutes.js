const express = require("express");
const router = express.Router();

const {
  getAllHospitals,
  getHospitalsByCity,
  getHospitalById,
  createHospital,
  updateHospital,
} = require("../controllers/hospitalController");

router.get("/status/open", async (req, res) => {
  try {
    const hospitals = await Hospital.find({ opdStatus: "Open" });
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

// Delete hospital
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Hospital.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
