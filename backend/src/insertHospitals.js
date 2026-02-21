require("dotenv").config({ path: "../.env" }); // adjust path as per your folder
const mongoose = require("mongoose");
const Hospital = require("./models/Hospital"); // correct relative path

// 10 sample hospitals
const hospitals = [
  {
    name: "City Care Hospital",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "JM Road, Pune",
    contact: "9876543210",
    totalBeds: 100,
    availableBeds: 25,
    icuBeds: 5,
    opdStatus: "Open",
    location: { lat: 18.5196, lng: 73.8553 },
  },
  {
    name: "Green Valley Hospital",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Andheri East, Mumbai",
    contact: "9123456780",
    totalBeds: 80,
    availableBeds: 10,
    icuBeds: 8,
    opdStatus: "Open",
    location: { lat: 19.119, lng: 72.8479 },
  },
  {
    name: "Sunrise Medical Center",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Koregaon Park, Pune",
    contact: "9988776655",
    totalBeds: 120,
    availableBeds: 40,
    icuBeds: 10,
    opdStatus: "Closed",
    location: { lat: 18.536, lng: 73.8938 },
  },
  {
    name: "Ocean View Hospital",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Bandra West, Mumbai",
    contact: "9871122334",
    totalBeds: 90,
    availableBeds: 15,
    icuBeds: 7,
    opdStatus: "Open",
    location: { lat: 19.06, lng: 72.829 },
  },
  {
    name: "Lotus Health Care",
    city: "Nagpur",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Sitabuldi, Nagpur",
    contact: "9122334455",
    totalBeds: 70,
    availableBeds: 20,
    icuBeds: 5,
    opdStatus: "Closed",
    location: { lat: 21.1458, lng: 79.0882 },
  },
  {
    name: "Rainbow Hospital",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Baner, Pune",
    contact: "9898989898",
    totalBeds: 110,
    availableBeds: 30,
    icuBeds: 12,
    opdStatus: "Open",
    location: { lat: 18.563, lng: 73.789 },
  },
  {
    name: "City Hospital & Research",
    city: "Nagpur",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Mahatma Nagar, Nagpur",
    contact: "9122445566",
    totalBeds: 85,
    availableBeds: 25,
    icuBeds: 6,
    opdStatus: "Open",
    location: { lat: 21.15, lng: 79.09 },
  },
  {
    name: "Prime Health Hospital",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Malad West, Mumbai",
    contact: "9988770011",
    totalBeds: 95,
    availableBeds: 12,
    icuBeds: 9,
    opdStatus: "Closed",
    location: { lat: 19.2, lng: 72.85 },
  },
  {
    name: "Hope Medical Center",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Viman Nagar, Pune",
    contact: "9877665544",
    totalBeds: 105,
    availableBeds: 35,
    icuBeds: 11,
    opdStatus: "Open",
    location: { lat: 18.566, lng: 73.913 },
  },
  {
    name: "Global Care Hospital",
    city: "Nagpur",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    address: "Civil Lines, Nagpur",
    contact: "9122556677",
    totalBeds: 75,
    availableBeds: 18,
    icuBeds: 6,
    opdStatus: "Open",
    location: { lat: 21.145, lng: 79.083 },
  },
];

async function insertHospitals() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // no options needed
    console.log("MongoDB connected");

    const inserted = await Hospital.insertMany(hospitals);
    console.log("Inserted 10 hospitals successfully!");
    console.log(inserted.map((h) => h.name));

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (err) {
    console.error("Error inserting hospitals:", err.message);
  }
}

insertHospitals();
