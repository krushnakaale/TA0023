const Doctor = require("../models/Doctor");

exports.getDoctorsByHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    // Validate hospitalId
    if (!hospitalId || !hospitalId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid hospital ID" });
    }

    const doctors = await Doctor.find({ hospital: hospitalId });
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err); // log error
    res.status(500).json({ message: err.message });
  }
};
