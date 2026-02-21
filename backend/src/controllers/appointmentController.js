const Appointment = require("../models/Appointment");
const nodemailer = require("nodemailer");

// Email config (from .env)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 🔹 User requests appointment
exports.requestAppointment = async (req, res) => {
  try {
    const { userName, userEmail, doctorId, hospitalId } = req.body;

    const newAppointment = new Appointment({
      userName,
      userEmail,
      doctor: doctorId,
      hospital: hospitalId,
    });

    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Doctor accepts / rejects appointment
exports.respondAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, rejectionReason } = req.body; // action: "accept" or "reject"

    const appointment = await Appointment.findById(id).populate("doctor");

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (action === "accept") {
      // generate token
      const token = Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit
      appointment.status = "Accepted";
      appointment.token = token;

      // send email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: appointment.userEmail,
        subject: "Appointment Confirmed",
        text: `Hi ${appointment.userName}, your appointment with Dr. ${appointment.doctor.name} is confirmed. Your token is: ${token}`,
      });
    } else if (action === "reject") {
      appointment.status = "Rejected";
      appointment.rejectionReason = rejectionReason || "No reason provided";

      // send email to user
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: appointment.userEmail,
        subject: "Appointment Rejected",
        text: `Hi ${appointment.userName}, your appointment with Dr. ${appointment.doctor.name} was rejected. Reason: ${appointment.rejectionReason}`,
      });
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await appointment.save();
    res.status(200).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
