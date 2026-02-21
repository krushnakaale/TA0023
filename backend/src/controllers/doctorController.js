const Doctor = require("../models/Doctor");

// 🔹 Get doctors by hospital
exports.getDoctorsByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const doctors = await Doctor.find({ hospital: hospitalId });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
