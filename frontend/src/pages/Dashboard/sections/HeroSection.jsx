import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

// --- Mock Data ---
const patientStats = [
  { label: "Total Appointments", value: "12", icon: Calendar, color: "blue" },
  { label: "Upcoming", value: "3", icon: Clock, color: "emerald" },
  { label: "Completed", value: "8", icon: CheckCircle, color: "emerald" },
  { label: "Cancelled", value: "1", icon: XCircle, color: "red" },
];

const doctorStats = [
  { label: "Total Patients", value: "148", icon: User, color: "blue" },
  {
    label: "Today's Appointments",
    value: "6",
    icon: Calendar,
    color: "emerald",
  },
  { label: "Pending Requests", value: "4", icon: AlertCircle, color: "yellow" },
  { label: "Completed Today", value: "2", icon: CheckCircle, color: "emerald" },
];

const patientAppointments = [
  {
    doctor: "Dr. Ayesha Khan",
    specialty: "Cardiologist",
    date: "Feb 24, 2026",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    doctor: "Dr. Rajan Mehta",
    specialty: "Dermatologist",
    date: "Feb 28, 2026",
    time: "2:30 PM",
    status: "upcoming",
  },
  {
    doctor: "Dr. Priya Nair",
    specialty: "General Physician",
    date: "Feb 10, 2026",
    time: "11:00 AM",
    status: "completed",
  },
  {
    doctor: "Dr. Suresh Patil",
    specialty: "Orthopedic",
    date: "Jan 30, 2026",
    time: "9:00 AM",
    status: "cancelled",
  },
];

const doctorAppointments = [
  {
    patient: "Rahul Sharma",
    age: 32,
    date: "Feb 21, 2026",
    time: "9:00 AM",
    status: "completed",
  },
  {
    patient: "Meena Joshi",
    age: 45,
    date: "Feb 21, 2026",
    time: "10:30 AM",
    status: "completed",
  },
  {
    patient: "Arjun Patil",
    age: 28,
    date: "Feb 21, 2026",
    time: "12:00 PM",
    status: "upcoming",
  },
  {
    patient: "Sneha Kulkarni",
    age: 55,
    date: "Feb 21, 2026",
    time: "3:00 PM",
    status: "pending",
  },
];

// --- Color helpers ---
const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-500" },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: "text-emerald-500",
  },
  red: { bg: "bg-red-50", text: "text-red-600", icon: "text-red-500" },
  yellow: {
    bg: "bg-yellow-50",
    text: "text-yellow-600",
    icon: "text-yellow-500",
  },
};

const statusStyle = {
  upcoming: "bg-blue-50 text-blue-600 border border-blue-200",
  completed: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  cancelled: "bg-red-50 text-red-500 border border-red-200",
  pending: "bg-yellow-50 text-yellow-600 border border-yellow-200",
};

// --- Stat Card ---
function StatCard({ label, value, icon: Icon, color }) {
  const c = colorMap[color];
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.bg}`}
      >
        <Icon size={20} className={c.icon} />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [role, setRole] = useState("patient");

  const isPatient = role === "patient";
  const stats = isPatient ? patientStats : doctorStats;
  const appointments = isPatient ? patientAppointments : doctorAppointments;

  return (
    <section className="w-full bg-transparent px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Dashboard
            </p>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {isPatient ? "👋 Hello, Rahul" : "👨‍⚕️ Hello, Dr. Ayesha"}
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {isPatient
                ? "Here's a summary of your appointments."
                : "Here's your schedule and patient overview."}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 self-start sm:self-auto">
            <button
              onClick={() => setRole("patient")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isPatient
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <User size={13} /> Patient
            </button>
            <button
              onClick={() => setRole("doctor")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                !isPatient
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Stethoscope size={13} /> Doctor
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Appointments Table */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <h2 className="text-sm font-bold text-gray-800">
                {isPatient ? "My Appointments" : "Today's Schedule"}
              </h2>
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {appointments.length} records
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                  {isPatient ? (
                    <>
                      <th className="text-left px-6 py-3 font-semibold">
                        Doctor
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Specialty
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Date
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Time
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Status
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="text-left px-6 py-3 font-semibold">
                        Patient
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">Age</th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Date
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Time
                      </th>
                      <th className="text-left px-6 py-3 font-semibold">
                        Status
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isPatient
                  ? patientAppointments.map((a, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {a.doctor}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {a.specialty}
                        </td>
                        <td className="px-6 py-4 text-gray-500">{a.date}</td>
                        <td className="px-6 py-4 text-gray-500">{a.time}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize ${statusStyle[a.status]}`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  : doctorAppointments.map((a, i) => (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {a.patient}
                        </td>
                        <td className="px-6 py-4 text-gray-500">{a.age} yrs</td>
                        <td className="px-6 py-4 text-gray-500">{a.date}</td>
                        <td className="px-6 py-4 text-gray-500">{a.time}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg capitalize ${statusStyle[a.status]}`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
