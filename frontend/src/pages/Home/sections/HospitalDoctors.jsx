import { useState } from "react";
import {
  MapPin,
  BedDouble,
  Activity,
  Stethoscope,
  Calendar,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react";

// Color palette cycling for doctor avatars
const avatarColors = [
  {
    bg: "bg-blue-100",
    text: "text-blue-700",
    ring: "ring-blue-200",
    btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
  },
  {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
  },
  {
    bg: "bg-violet-100",
    text: "text-violet-700",
    ring: "ring-violet-200",
    btn: "bg-violet-600 hover:bg-violet-700 shadow-violet-200",
  },
  {
    bg: "bg-amber-100",
    text: "text-amber-700",
    ring: "ring-amber-200",
    btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-200",
  },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// ── Inner component renamed to DoctorCard (was HospitalDoctors — caused the error)
function DoctorCard({ doc, index, onRequest, loading }) {
  const c = avatarColors[index % avatarColors.length];
  const initials = getInitials(doc.name);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
      {/* Top — Avatar + Name + Specialty */}
      <div className="flex items-start gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ring-2 shrink-0 ${c.bg} ${c.text} ${c.ring}`}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 text-sm truncate">
            {doc.name}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <Stethoscope size={11} />
            {doc.specialization || "General Physician"}
          </p>
        </div>
        {/* Available badge */}
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 border ${
            doc.available !== false
              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
              : "bg-gray-100 text-gray-400 border-gray-200"
          }`}
        >
          {doc.available !== false ? "Available" : "Busy"}
        </span>
      </div>

      {/* Meta — Rating, Experience, Time */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-400">
        {doc.rating && (
          <span className="flex items-center gap-1">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="font-semibold text-gray-700">{doc.rating}</span>
            {doc.reviews && <span>({doc.reviews})</span>}
          </span>
        )}
        {doc.experience && (
          <>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {doc.experience} exp
            </span>
          </>
        )}
        {doc.nextSlot && (
          <>
            <span className="w-px h-3 bg-gray-200" />
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {doc.nextSlot}
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* CTA */}
      <button
        disabled={loading || doc.available === false}
        onClick={() => onRequest(doc)}
        className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200
          ${
            doc.available !== false && !loading
              ? `text-white ${c.btn} hover:shadow-md hover:-translate-y-0.5`
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin w-3.5 h-3.5"
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
        ) : doc.available !== false ? (
          <>
            <Calendar size={13} />
            Request Appointment
            <ChevronRight size={13} />
          </>
        ) : (
          "Not Available"
        )}
      </button>
    </div>
  );
}

// ── Main export
export default function HospitalDoctors({ hospital, doctors = [], onRequest }) {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(null);

  if (!hospital) return null;

  const handleRequest = async (doc) => {
    setLoading(true);
    setRequested(doc._id);
    await onRequest(doc);
    setLoading(false);
    setRequested(null);
  };

  const opdColor = {
    Open: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Closed: "bg-red-50 text-red-500 border-red-200",
    Busy: "bg-yellow-50 text-yellow-600 border-yellow-200",
  };

  return (
    <div className="w-full mt-10">
      {/* ── Hospital Info Card ─────────────────────── */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left — Name + Address */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity size={16} className="text-primary" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                {hospital.name}
              </h2>
            </div>
            <p className="text-sm text-gray-400 flex items-center gap-1 ml-10">
              <MapPin size={12} />
              {hospital.address}, {hospital.city}
            </p>
          </div>

          {/* Right — OPD Status */}
          <span
            className={`self-start text-xs font-semibold px-3 py-1.5 rounded-xl border ${
              opdColor[hospital.opdStatus] ||
              "bg-gray-100 text-gray-500 border-gray-200"
            }`}
          >
            OPD: {hospital.opdStatus || "N/A"}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-5" />

        {/* Bed stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
            <BedDouble size={15} className="text-blue-500" />
            <div>
              <p className="text-xs text-gray-400 font-medium">
                Available Beds
              </p>
              <p className="text-sm font-extrabold text-gray-900">
                {hospital.availableBeds ?? "—"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
            <Activity size={15} className="text-red-400" />
            <div>
              <p className="text-xs text-gray-400 font-medium">ICU Beds</p>
              <p className="text-sm font-extrabold text-gray-900">
                {hospital.icuBeds ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Doctors Section ────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            Available Staff
          </p>
          <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
            Doctors at this Hospital
          </h3>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">
          {doctors.length} doctor{doctors.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Empty state */}
      {doctors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white border border-gray-100 rounded-2xl text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
            <Stethoscope size={22} className="text-gray-400" />
          </div>
          <p className="text-sm font-semibold text-gray-500">
            No doctors found
          </p>
          <p className="text-xs text-gray-400 mt-1">
            No doctors are listed for this hospital yet.
          </p>
        </div>
      )}

      {/* Doctor grid */}
      {doctors.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc, i) => (
            <DoctorCard
              key={doc._id}
              doc={doc}
              index={i}
              onRequest={handleRequest}
              loading={loading && requested === doc._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
