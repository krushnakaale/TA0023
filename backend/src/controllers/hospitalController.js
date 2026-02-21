const Hospital = require("../models/Hospital");

// 🔹 Get All Hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Hospitals By City (Select City step)
exports.getHospitalsByCity = async (req, res) => {
  try {
    const { city } = req.params;
    // const hospitals = await Hospital.find({ city });
    const hospitals = await Hospital.find({
      city: { $regex: `^${city}$`, $options: "i" },
    });

    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Single Hospital Details (Click Hospital)
exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Add New Hospital (Admin)
exports.createHospital = async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    const savedHospital = await newHospital.save();

    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Update Bed + OPD (Admin)
exports.updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const updatedHospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


