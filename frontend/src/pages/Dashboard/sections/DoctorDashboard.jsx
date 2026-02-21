import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboard({ doctorId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending appointments
  const fetchAppointments = async () => {
    setLoading(true);
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
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Accept or Reject appointment
  const respondAppointment = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/respond`, {
        status,
      });
      alert(`Appointment ${status}`);
      fetchAppointments(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to respond to appointment");
    }
  };

  if (loading)
    return <p className="text-gray-500 mt-4">Loading appointments...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🩺 Doctor Dashboard</h1>

      {appointments.length === 0 && (
        <p className="text-gray-500">No pending appointments.</p>
      )}

      <div className="grid gap-4">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="mb-2 md:mb-0">
              <p>
                <span className="font-semibold">Patient:</span> {appt.userName}{" "}
                ({appt.userEmail})
              </p>
              <p>
                <span className="font-semibold">Hospital:</span>{" "}
                {appt.hospital.name}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(appt.date).toDateString()} |{" "}
                <span className="font-semibold">Time:</span> {appt.timeSlot}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    appt.status === "Pending"
                      ? "text-yellow-600"
                      : appt.status === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                  }
                >
                  {appt.status}
                </span>
              </p>
            </div>

            {appt.status === "Pending" && (
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  onClick={() => respondAppointment(appt._id, "Accepted")}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => respondAppointment(appt._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
