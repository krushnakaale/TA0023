import { useEffect, useState } from "react";
import axios from "axios";
import HospitalDoctors from "./HospitalDoctors";
import {
  Search,
  SlidersHorizontal,
  Plus,
  X,
  BedDouble,
  Activity,
  MapPin,
  Pencil,
  Trash2,
  Stethoscope,
  User,
  Mail,
  Calendar,
  Clock,
} from "lucide-react";

// ── OPD badge helper ─────────────────────────────────────────────────────────
const opdBadge = {
  Open: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Closed: "bg-red-50 text-red-500 border-red-200",
  Busy: "bg-yellow-50 text-yellow-600 border-yellow-200",
};

// ── Reusable input style ─────────────────────────────────────────────────────
const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white placeholder:text-gray-300 text-gray-800 transition-all duration-200";

export default function HeroSection() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [hospitals, setHospitals] = useState([]);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
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

  // Doctors popup
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showDoctorsPopup, setShowDoctorsPopup] = useState(false);

  // Appointment modal
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [apptLoading, setApptLoading] = useState(false);

  // Filters
  const [cityFilter, setCityFilter] = useState("");
  const [opdFilter, setOpdFilter] = useState("All");

  // ── API calls ──────────────────────────────────────────────────────────────
  const fetchHospitals = () => {
    axios
      .get("http://localhost:8080/api/hospitals")
      .then((res) => setHospitals(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

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
      setShowHospitalModal(false);
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
    setShowHospitalModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hospital?")) return;
    await axios.delete(`http://localhost:8080/api/hospitals/${id}`);
    fetchHospitals();
  };

  // View doctors → open popup
  const viewDoctors = async (hospital) => {
    setSelectedHospital(hospital);
    setDoctors([]);
    setShowDoctorsPopup(true);
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

  const closeDoctorsPopup = () => {
    setShowDoctorsPopup(false);
    setSelectedHospital(null);
    setDoctors([]);
  };

  // Doctor card "Request Appointment" → opens appointment modal inside popup
  const handleDoctorRequest = (doc) => {
    setSelectedDoctor(doc);
  };

  const requestAppointment = async (e) => {
    e.preventDefault();
    setApptLoading(true);
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
    } finally {
      setApptLoading(false);
    }
  };

  // ── Filtered hospitals ─────────────────────────────────────────────────────
  const filteredHospitals = hospitals.filter((h) => {
    const cityMatch = cityFilter
      ? h.city.toLowerCase().includes(cityFilter.toLowerCase())
      : true;
    const opdMatch = opdFilter === "All" ? true : h.opdStatus === opdFilter;
    return cityMatch && opdMatch;
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="w-full bg-transparent px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
              Admin Panel
            </p>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Hospitals
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage hospitals and view available doctors.
            </p>
          </div>
          <button
            onClick={() => {
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
              setShowHospitalModal(true);
            }}
            className="self-start sm:self-auto flex items-center gap-2 bg-primary hover:bg-primaryHover text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
          >
            <Plus size={16} /> Add Hospital
          </button>
        </div>

        {/* ── Filters ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search by city..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-52 placeholder:text-gray-300"
            />
          </div>
          <div className="relative">
            <SlidersHorizontal
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={opdFilter}
              onChange={(e) => setOpdFilter(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer text-gray-700"
            >
              <option value="All">All OPD Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Busy">Busy</option>
            </select>
          </div>
          {(cityFilter || opdFilter !== "All") && (
            <button
              onClick={() => {
                setCityFilter("");
                setOpdFilter("All");
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:border-red-300 hover:text-red-500 bg-white transition-all"
            >
              <X size={13} /> Reset
            </button>
          )}
          <span className="ml-auto self-center text-xs text-gray-400 font-medium">
            {filteredHospitals.length} hospital
            {filteredHospitals.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Hospital Cards Grid ──────────────────────────────────────── */}
        {filteredHospitals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-2xl text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <Activity size={22} className="text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-500">
              No hospitals found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHospitals.map((h) => (
              <div
                key={h._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Hospital image */}
                <img
                  src={
                    h.image ||
                    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&q=80"
                  }
                  alt={h.name}
                  className="h-40 w-full object-cover"
                />

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Name + city */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {h.name}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {h.city}
                    </p>
                  </div>

                  {/* Bed info */}
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1.5 text-xs">
                      <BedDouble size={12} className="text-blue-500" />
                      <span className="text-gray-600 font-medium">
                        {h.availableBeds} beds
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1.5 text-xs">
                      <Activity size={12} className="text-red-400" />
                      <span className="text-gray-600 font-medium">
                        {h.icuBeds} ICU
                      </span>
                    </div>
                    <span
                      className={`ml-auto self-center text-[10px] font-semibold px-2.5 py-1 rounded-lg border ${opdBadge[h.opdStatus] || "bg-gray-100 text-gray-500 border-gray-200"}`}
                    >
                      {h.opdStatus}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100" />

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEdit(h)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 transition-colors"
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(h._id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                    <button
                      onClick={() => viewDoctors(h)}
                      className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-primaryHover transition-colors ml-auto"
                    >
                      <Stethoscope size={12} /> View Doctors
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* POPUP — Doctors (HospitalDoctors rendered inside a modal overlay)     */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {showDoctorsPopup && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDoctorsPopup();
          }}
        >
          <div className="bg-background w-full max-w-4xl rounded-3xl shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={closeDoctorsPopup}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={16} />
            </button>

            {/* HospitalDoctors component renders inside here */}
            <div className="px-6 pb-8">
              <HospitalDoctors
                hospital={selectedHospital}
                doctors={doctors}
                onRequest={handleDoctorRequest}
              />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* MODAL — Add / Edit Hospital                                           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {showHospitalModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-7 relative">
            <button
              onClick={() => setShowHospitalModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>

            <h2 className="text-xl font-extrabold text-gray-900 mb-6">
              {editId ? "Update Hospital" : "Add Hospital"}
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Hospital Name
                </label>
                <input
                  name="name"
                  placeholder="e.g. City Care Hospital"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  City
                </label>
                <input
                  name="city"
                  placeholder="e.g. Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputCls}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact
                </label>
                <input
                  name="contact"
                  placeholder="Phone number"
                  value={formData.contact}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Beds
                </label>
                <input
                  name="totalBeds"
                  placeholder="e.g. 100"
                  value={formData.totalBeds}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Available Beds
                </label>
                <input
                  name="availableBeds"
                  placeholder="e.g. 40"
                  value={formData.availableBeds}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ICU Beds
                </label>
                <input
                  name="icuBeds"
                  placeholder="e.g. 10"
                  value={formData.icuBeds}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  OPD Status
                </label>
                <select
                  name="opdStatus"
                  value={formData.opdStatus}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Busy">Busy</option>
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowHospitalModal(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primaryHover rounded-xl transition-colors"
                >
                  {editId ? "Update" : "Add Hospital"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/* MODAL — Request Appointment (opens on top of doctors popup)           */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-7 relative">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Doctor info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {selectedDoctor.name
                  ?.split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div>
                <h2 className="text-base font-extrabold text-gray-900">
                  Book Appointment
                </h2>
                <p className="text-xs text-gray-400">
                  {selectedDoctor.name} ·{" "}
                  {selectedDoctor.specialization || "Doctor"}
                </p>
              </div>
            </div>

            <form onSubmit={requestAppointment} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Your Name
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    placeholder="Full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className={`${inputCls} pl-9`}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className={`${inputCls} pl-9`}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`${inputCls} pl-9`}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Time
                  </label>
                  <div className="relative">
                    <Clock
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className={`${inputCls} pl-9`}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={apptLoading}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-emerald-600 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {apptLoading ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        />
                      </svg>
                      Requesting...
                    </>
                  ) : (
                    <>
                      <Calendar size={14} /> Confirm Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
