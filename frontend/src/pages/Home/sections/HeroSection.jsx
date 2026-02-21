import { useEffect, useState } from "react";
import axios from "axios";

export default function HeroSection() {
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

  const fetchHospitals = () => {
    axios
      .get("http://localhost:8080/api/hospitals")
      .then((res) => setHospitals(res.data));
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          🏥 Smart OPD Dashboard
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          + Add Hospital
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {hospitals.map((h) => (
          <div
            key={h._id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
              alt="Hospital"
              className="h-48 w-full object-cover"
            />

            {/* Content */}
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
                  className={`font-semibold ${
                    h.opdStatus === "Open" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {h.opdStatus}
                </span>
              </p>

              <div className="flex gap-3">
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
    </section>
  );
}
