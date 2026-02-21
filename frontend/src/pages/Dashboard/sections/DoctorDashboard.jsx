import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Stethoscope,
} from "lucide-react";

// ── Status config ─────────────────────────────────────────────────────────────
const statusConfig = {
  Pending: {
    style: "bg-yellow-50 text-yellow-600 border-yellow-200",
    icon: AlertCircle,
  },
  Accepted: {
    style: "bg-emerald-50 text-emerald-600 border-emerald-200",
    icon: CheckCircle,
  },
  Rejected: { style: "bg-red-50 text-red-500 border-red-200", icon: XCircle },
};

// ── Single appointment card ───────────────────────────────────────────────────
function AppointmentCard({ appt, onRespond }) {
  const [loading, setLoading] = useState(null); // "Accepted" | "Rejected" | null
  const s = statusConfig[appt.status] || statusConfig.Pending;
  const StatusIcon = s.icon;

  const handle = async (status) => {
    setLoading(status);
    await onRespond(appt._id, status);
    setLoading(null);
  };

  // Patient initials for avatar
  const initials = (appt.userName || "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col gap-4">
      {/* Top — Patient + Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">{appt.userName}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Mail size={11} /> {appt.userEmail}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border shrink-0 ${s.style}`}
        >
          <StatusIcon size={11} />
          {appt.status}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Meta info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <Building2 size={13} className="text-primary shrink-0" />
          <span className="truncate font-medium">
            {appt.hospital?.name || "—"}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <Calendar size={13} className="text-primary shrink-0" />
          <span className="font-medium">
            {new Date(appt.date).toDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
          <Clock size={13} className="text-primary shrink-0" />
          <span className="font-medium">{appt.timeSlot}</span>
        </div>
      </div>

      {/* Action buttons — only for Pending */}
      {appt.status === "Pending" && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => handle("Accepted")}
            disabled={!!loading}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-200 hover:shadow-md hover:shadow-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading === "Accepted" ? (
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
            ) : (
              <CheckCircle size={13} />
            )}
            Accept
          </button>
          <button
            onClick={() => handle("Rejected")}
            disabled={!!loading}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-xl bg-red-50 hover:bg-red-500 hover:text-white text-red-500 border border-red-200 hover:border-red-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading === "Rejected" ? (
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
            ) : (
              <XCircle size={13} />
            )}
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function DoctorDashboard({ doctorId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointments/doctor/${doctorId}`,
      );
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch appointments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const respondAppointment = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/respond`, {
        status,
      });
      fetchAppointments(true); // silent refresh
    } catch (err) {
      console.error(err);
      alert("Failed to respond to appointment");
    }
  };

  // Filter + counts
  const counts = {
    All: appointments.length,
    Pending: appointments.filter((a) => a.status === "Pending").length,
    Accepted: appointments.filter((a) => a.status === "Accepted").length,
    Rejected: appointments.filter((a) => a.status === "Rejected").length,
  };
  const filtered =
    filter === "All"
      ? appointments
      : appointments.filter((a) => a.status === filter);

  const tabs = ["All", "Pending", "Accepted", "Rejected"];
  const tabStyle = {
    All: "text-gray-600",
    Pending: "text-yellow-600",
    Accepted: "text-emerald-600",
    Rejected: "text-red-500",
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="w-full bg-transparent px-6 py-10">
        <div className="max-w-6xl min-w-6xl mx-auto">
          <div className="h-8 w-48 bg-gray-100 rounded-xl animate-pulse mb-8" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100" />
                  <div className="flex-1">
                    <div className="h-3.5 w-32 bg-gray-100 rounded mb-2" />
                    <div className="h-3 w-44 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-9 bg-gray-100 rounded-xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-transparent px-6 py-10">
      <div className="max-w-6xl min-w-6xl mx-auto">
        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
              Doctor Portal
            </p>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Stethoscope size={22} className="text-primary" />
              My Appointments
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Review and respond to patient requests.
            </p>
          </div>

          {/* Refresh button */}
          <button
            onClick={() => fetchAppointments(true)}
            disabled={refreshing}
            className="self-start sm:self-auto flex items-center gap-2 text-sm font-semibold text-gray-500 border border-gray-200 px-4 py-2.5 rounded-xl hover:border-primary hover:text-primary bg-white transition-all disabled:opacity-60"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* ── Summary Stats ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {[
            { label: "Total", value: counts.All, color: "blue" },
            { label: "Pending", value: counts.Pending, color: "yellow" },
            { label: "Accepted", value: counts.Accepted, color: "emerald" },
            { label: "Rejected", value: counts.Rejected, color: "red" },
          ].map((s) => (
            <div
              key={s.label}
              className={`bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm`}
            >
              <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Filter Tabs ───────────────────────────────────────────── */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                filter === t
                  ? `bg-white shadow-sm ${tabStyle[t]}`
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  filter === t ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {/* ── Appointments List ─────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-2xl text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar size={22} className="text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-500">
              No {filter !== "All" ? filter.toLowerCase() : ""} appointments
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Nothing to show here right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((appt) => (
              <AppointmentCard
                key={appt._id}
                appt={appt}
                onRespond={respondAppointment}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
