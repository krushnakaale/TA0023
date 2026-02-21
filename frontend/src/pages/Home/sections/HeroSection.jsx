import { useEffect, useState } from "react";
import axios from "axios";
import HospitalDoctors from "./HospitalDoctors";

export default function HeroSection() {
  // 🏥 Hospitals
  const [hospitals, setHospitals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    contact: "",
    totalBeds: "",
    availableBeds: "",
    icuBeds: "",
    opdStatus: "Open",
  });

  // 🩺 Selected hospital + doctors
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // 📝 Appointment form
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // Filters
  const [cityFilter, setCityFilter] = useState("");
  const [opdFilter, setOpdFilter] = useState("All");

  // Fetch hospitals
  const fetchHospitals = () => {
    axios
      .get("http://localhost:8080/api/hospitals")
      .then((res) => setHospitals(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // CRUD Handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `http://localhost:8080/api/hospitals/${editId}`,
          formData,
        );
      } else {
        await axios.post("http://localhost:8080/api/hospitals", formData);
      }
      setShowModal(false);
      setEditId(null);
      setFormData({
        name: "",
        city: "",
        contact: "",
        totalBeds: "",
        availableBeds: "",
        icuBeds: "",
        opdStatus: "Open",
      });
      fetchHospitals();
    } catch (err) {
      console.error(err);
      alert("Error saving hospital");
    }
  };

  const handleEdit = (hospital) => {
    setFormData(hospital);
    setEditId(hospital._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/hospitals/${id}`);
    fetchHospitals();
  };

  // View doctors for selected hospital
  const viewDoctors = async (hospital) => {
    setSelectedHospital(hospital);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/doctors/hospital/${hospital._id}`,
      );
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch doctors");
    }
  };

  // Request appointment
  const requestAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/appointments", {
        userName,
        userEmail,
        doctor: selectedDoctor._id,
        hospital: selectedHospital._id,
        date,
        timeSlot,
      });
      alert("Appointment requested successfully!");
      setSelectedDoctor(null);
      setUserName("");
      setUserEmail("");
      setDate("");
      setTimeSlot("");
    } catch (err) {
      console.error(err);
      alert("Failed to request appointment");
    }
  };

  // Filter hospitals
  const filteredHospitals = hospitals.filter((h) => {
    const cityMatch = cityFilter
      ? h.city.toLowerCase().includes(cityFilter.toLowerCase())
      : true;
    const opdMatch = opdFilter === "All" ? true : h.opdStatus === opdFilter;
    return cityMatch && opdMatch;
  });

  return (
    <section className="min-h-screen  p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Smart OPD Dashboard
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          + Add Hospital
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <input
          placeholder="Search by city"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border p-2 rounded-lg"
        />
        <select
          value={opdFilter}
          onChange={(e) => setOpdFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="All">All OPD Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          onClick={() => {
            setCityFilter("");
            setOpdFilter("All");
          }}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Hospital Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredHospitals.map((h) => (
          <div
            key={h._id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={
                h.image ||
                "https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
              }
              alt="Hospital"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold">{h.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{h.city}</p>
              <p className="text-sm">
                🛏 Available Beds: <b>{h.availableBeds}</b>
              </p>
              <p className="text-sm">
                🏥 ICU Beds: <b>{h.icuBeds}</b>
              </p>
              <p className="text-sm mb-4">
                OPD:{" "}
                <span
                  className={
                    h.opdStatus === "Open" ? "text-green-600" : "text-red-600"
                  }
                >
                  {h.opdStatus}
                </span>
              </p>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleEdit(h)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(h._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => viewDoctors(h)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  View Doctors
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Hospital + Doctors */}
      {selectedHospital && (
        <HospitalDoctors
          hospital={selectedHospital}
          doctors={doctors}
          onRequest={setSelectedDoctor} // opens appointment modal
        />
      )}

      {/* Hospital Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">
              {editId ? "Update Hospital" : "Add Hospital"}
            </h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Hospital Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                name="totalBeds"
                placeholder="Total Beds"
                value={formData.totalBeds}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                name="availableBeds"
                placeholder="Available Beds"
                value={formData.availableBeds}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                name="icuBeds"
                placeholder="ICU Beds"
                value={formData.icuBeds}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <select
                name="opdStatus"
                value={formData.opdStatus}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>

              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Appointment with {selectedDoctor.name}
            </h2>
            <form onSubmit={requestAppointment} className="grid gap-3">
              <input
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <input
                placeholder="Your Email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />
              <input
                type="time"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="border p-2 rounded-lg"
                required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
