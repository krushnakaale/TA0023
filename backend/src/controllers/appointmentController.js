const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");

// Request appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);

    // Optionally, notify doctor by email here
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor view pending appointments
exports.getPendingAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: "Pending",
      doctor: req.params.doctorId,
    })
      .populate("hospital")
      .populate("doctor");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor respond (accept/reject)
exports.respondAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Accepted or Rejected

    if (!["Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    )
      .populate("doctor")
      .populate("hospital");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Send email to user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: appointment.userEmail,
      subject: `Appointment ${status}`,
      text: `Your appointment with Dr.${appointment.doctor.name} at ${appointment.hospital.name} on ${appointment.date.toDateString()} (${appointment.timeSlot}) has been ${status}.`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr.message);
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// New: get all pending appointments (for admin or doctor dashboard overview)
exports.getAllPendingAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "Pending" })
      .populate("doctor")
      .populate("hospital");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
