require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");
const Hospital = require("./models/Hospital");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Sample doctors linked to hospital IDs
const doctors = [
  {
    name: "Dr. Aakash Patil",
    specialization: "Cardiology",
    hospital: "699932bc19ada8e905e196c2", // City Care Hospital, Pune
    email: "aakash.patil@example.com",
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "Neurology",
    hospital: "699932bc19ada8e905e196c2", // City Care Hospital, Pune
    email: "priya.sharma@example.com",
  },
  {
    name: "Dr. Rohit Mehta",
    specialization: "Orthopedics",
    hospital: "69994283fa4f7379f5269933", // Green Valley Hospital, Mumbai
    email: "rohit.mehta@example.com",
  },
  {
    name: "Dr. Sneha Joshi",
    specialization: "Pediatrics",
    hospital: "69994283fa4f7379f5269934", // Sunrise Medical Center, Pune
    email: "sneha.joshi@example.com",
  },
  {
    name: "Dr. Karan Desai",
    specialization: "General Medicine",
    hospital: "69994283fa4f7379f5269935", // Ocean View Hospital, Mumbai
    email: "karan.desai@example.com",
  },
  {
    name: "Dr. Anjali Rao",
    specialization: "Gynecology",
    hospital: "69994283fa4f7379f5269937", // Rainbow Hospital, Pune
    email: "anjali.rao@example.com",
  },
  {
    name: "Dr. Vikram Singh",
    specialization: "Dermatology",
    hospital: "69994283fa4f7379f5269938", // City Hospital & Research, Nagpur
    email: "vikram.singh@example.com",
  },
  {
    name: "Dr. Meera Kulkarni",
    specialization: "ENT",
    hospital: "69994283fa4f7379f5269939", // Prime Health Hospital, Mumbai
    email: "meera.kulkarni@example.com",
  },
  {
    name: "Dr. Sameer Patankar",
    specialization: "Cardiology",
    hospital: "69994283fa4f7379f526993a", // Hope Medical Center, Pune
    email: "sameer.patankar@example.com",
  },
  {
    name: "Dr. Nisha Gawande",
    specialization: "Neurology",
    hospital: "69994283fa4f7379f526993b", // Global Care Hospital, Nagpur
    email: "nisha.gawande@example.com",
  },
];

// Insert doctors
async function insertDoctors() {
  try {
    const inserted = await Doctor.insertMany(doctors);
    console.log("Doctors inserted successfully:", inserted.length);
    process.exit();
  } catch (err) {
    console.error("Error inserting doctors:", err);
    process.exit(1);
  }
}

insertDoctors();
